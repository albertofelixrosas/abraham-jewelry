import type { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Anillo Brillante',
    description: 'Anillo de plata con baño dorado y detalle de circonita.',
    price: 1250,
    category: 'Anillos',
    sku: 'AR-001',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80',
    alt: 'Anillo dorado con circonita'
  },
  {
    id: 'prod-002',
    name: 'Aretes Elegance',
    description: 'Aretes colgantes en tonalidad dorada con acabado mate.',
    price: 980,
    category: 'Aretes',
    sku: 'AE-002',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d5?auto=format&fit=crop&w=900&q=80',
    alt: 'Aretes dorados colgantes'
  },
  {
    id: 'prod-003',
    name: 'Pulsera Clásica',
    description: 'Pulsera rígida con detalles minimalistas en dorado.',
    price: 840,
    category: 'Pulseras',
    sku: 'PL-003',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    alt: 'Pulsera dorada minimalista'
  }
];
