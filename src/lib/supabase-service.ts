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
