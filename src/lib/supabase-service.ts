import { supabase } from '@/lib/supabase-client';
import type { Product } from '@/types/product';
import type { CartItem } from '@/context/cart-context';

export const hasSupabase = Boolean(supabase);

export type SupabaseProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string | null;
  stock: number;
  category: { name: string } | null;
  product_images: Array<{ url: string; alt: string | null; sort_order: number }> | null;
};

export async function fetchProductsFromSupabase(): Promise<Product[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price,sku,stock,category:categories(name),product_images(url,alt,sort_order)')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching products from Supabase:', error?.message ?? 'unknown');
    return [];
  }

  const rows = data as unknown as SupabaseProductRow[];

  return rows.map((item) => {
    const imageUrl = item.product_images?.[0]?.url ?? 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80';
    const imageAlt = item.product_images?.[0]?.alt ?? item.name;

    return {
      id: item.id,
      name: item.name,
      description: item.description ?? '',
      price: item.price,
      category: item.category?.name ?? 'General',
      sku: item.sku ?? 'N/A',
      stock: item.stock,
      image: imageUrl,
      alt: imageAlt
    };
  });
}

export type CreateOrderPayload = {
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  note: string;
  items: CartItem[];
  total: number;
};

export async function createGuestOrder(order: CreateOrderPayload) {
  if (!supabase) {
    return { orderId: null as string | null, error: new Error('Supabase no está configurado.') };
  }

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        customer_email: order.customerEmail,
        note: order.note,
        total: order.total,
        status: 'pendiente'
      }
    ])
    .select('id')
    .single();

  if (orderError || !orderData) {
    console.error('Error creating order in Supabase:', orderError?.message ?? 'unknown');
    return { orderId: null as string | null, error: orderError ?? new Error('No se creó la orden') };
  }

  const orderItems = order.items.map((item) => ({
    order_id: orderData.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price,
    subtotal: item.price * item.quantity
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items in Supabase:', itemsError.message);
    return { orderId: orderData.id, error: itemsError };
  }

  return { orderId: orderData.id, error: null };
}

export type CreateProductPayload = {
  name: string;
  description?: string | null;
  price: number | string;
  category?: string | null;
  sku?: string | null;
  stock: number | string;
  image?: string | null;
  alt?: string | null;
};

export type CategoryRow = { id: string; name: string };

export async function fetchCategories(): Promise<CategoryRow[]> {
  if (!supabase) return [];

  const { data, error } = await supabase.from('categories').select('id,name').order('name', { ascending: true });
  if (error || !data) {
    console.error('Error fetching categories from Supabase:', error?.message ?? 'unknown');
    return [];
  }

  return data as CategoryRow[];
}

export async function createCategory(name: string, slug?: string) {
  if (!supabase) {
    return { categoryId: null as string | null, error: new Error('Supabase no está configurado.') };
  }

  try {
    // Ensure user is authenticated client-side; this will provide a clearer error
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) {
        return { categoryId: null as string | null, error: new Error('Usuario no autenticado. Inicia sesión como admin antes de crear categorías.') };
      }
    } catch (sessErr) {
      // ignore and proceed; server-side may not have auth
    }
    const finalSlug = slug && slug.trim() ? slugify(slug) : slugify(name);
    const { data, error } = await supabase.from('categories').insert([{ name: name.trim(), slug: finalSlug }]).select('id').maybeSingle();
    if (error || !data) {
      console.error('Error creando categoría:', error?.message ?? 'unknown');
      return { categoryId: null as string | null, error: error ?? new Error('No se creó la categoría') };
    }

    return { categoryId: (data as any).id as string, error: null };
  } catch (err: any) {
    console.error('createCategory error', err?.message ?? err);
    return { categoryId: null as string | null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

function slugify(text: string) {
  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-');
}

export async function createProduct(payload: CreateProductPayload) {
  if (!supabase) {
    return { productId: null as string | null, error: new Error('Supabase no está configurado.') };
  }

  try {
    // Ensure category exists (simple find-or-create by name)
    let categoryId: string | null = null;
    if (payload.category) {
      const { data: foundCats, error: catErr } = await supabase.from('categories').select('id').eq('name', payload.category).limit(1).maybeSingle();
      if (catErr) {
        console.error('Error buscando categoría:', catErr.message);
      }
      if (foundCats && (foundCats as any).id) {
        categoryId = (foundCats as any).id;
      } else {
        const slug = slugify(payload.category);
        const { data: newCat, error: newCatErr } = await supabase.from('categories').insert([{ name: payload.category, slug }]).select('id').maybeSingle();
        if (newCat && (newCat as any).id) categoryId = (newCat as any).id;
        if (newCatErr) console.error('Error creando categoría:', newCatErr.message);
      }
    }

    const productRow: any = {
      name: payload.name,
      description: payload.description ?? null,
      price: payload.price,
      sku: payload.sku ?? null,
      stock: payload.stock,
      category_id: categoryId,
      active: true
    };

    const { data: prodData, error: prodErr } = await supabase.from('products').insert([productRow]).select('id').maybeSingle();
    if (prodErr || !prodData) {
      console.error('Error creando producto:', prodErr?.message ?? 'unknown');
      return { productId: null as string | null, error: prodErr ?? new Error('No se creó el producto') };
    }

    const productId = (prodData as any).id as string;

    if (payload.image) {
      const imageRow = { product_id: productId, url: payload.image, alt: payload.alt ?? payload.name };
      const { error: imgErr } = await supabase.from('product_images').insert([imageRow]);
      if (imgErr) console.error('Error creando imagen de producto:', imgErr.message);
    }

    return { productId, error: null };
  } catch (err: any) {
    console.error('createProduct error', err?.message ?? err);
    return { productId: null as string | null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
