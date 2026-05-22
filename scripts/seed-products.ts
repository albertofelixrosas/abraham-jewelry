import { createClient } from '@supabase/supabase-js';

/**
 * Seed script for staging.
 *
 * Usage (preferred, with ts-node):
 *
 * ```bash
 * export SUPABASE_URL="https://xyz.supabase.co"
 * export SUPABASE_SERVICE_ROLE_KEY="<service_role_key>"
 * npx ts-node scripts/seed-products.ts
 * ```
 *
 * Or compile and run with `tsc` + `node`.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const products = [
  {
    name: 'Anillo Solitario Oro 18K',
    description: 'Anillo solitario en oro 18K con diamante central de 0.25ct.',
    price: 450.0,
    category: 'anillos',
    sku: 'AR-0001',
    stock: 5,
    image: 'products/anillo-solitario-18k.jpg',
    alt: 'Anillo solitario en oro 18K con diamante',
  },
  {
    name: 'Aros Perla Clásicos',
    description: 'Aros con perla natural y baño en oro, diseño clásico y elegante.',
    price: 120.0,
    category: 'aros',
    sku: 'AR-0002',
    stock: 12,
    image: 'products/aros-perla.jpg',
    alt: 'Aros con perla natural',
  },
  {
    name: 'Collar Baroque',
    description: 'Collar con cadena fina y colgante barroco enchapado en oro.',
    price: 200.0,
    category: 'collares',
    sku: 'CL-0001',
    stock: 8,
    image: 'products/collar-baroque.jpg',
    alt: 'Collar baroque enchapado en oro',
  },
  {
    name: 'Pulsera Tennis Plata',
    description: 'Pulsera tipo tennis en plata con circonitas.',
    price: 160.0,
    category: 'pulseras',
    sku: 'PB-0001',
    stock: 10,
    image: 'products/pulsera-tennis.jpg',
    alt: 'Pulsera tennis en plata',
  },
  {
    name: 'Dije Corazón Personalizable',
    description: 'Dije en oro con posibilidad de grabado personalizado.',
    price: 85.0,
    category: 'dijes',
    sku: 'DJ-0001',
    stock: 20,
    image: 'products/dije-corazon.jpg',
    alt: 'Dije corazón personalizable',
  },
  {
    name: 'Set Novia: Anillo + Aros',
    description: 'Paquete especial para novias: anillo y aros a juego.',
    price: 750.0,
    category: 'sets',
    sku: 'ST-0001',
    stock: 2,
    image: 'products/set-novia.jpg',
    alt: 'Set novia anillo y aros',
  },
];

async function main() {
  try {
    console.log('Seeding products...');

    // Optional: clear products table in staging (UNCOMMENT to enable)
    // console.log('Deleting existing products...');
    // await supabase.from('products').delete().neq('id', '');

    const { data, error } = await supabase.from('products').insert(products).select();

    if (error) {
      console.error('Insert error:', error);
      process.exit(1);
    }

    console.log(`Inserted ${Array.isArray(data) ? data.length : 0} products.`);
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

main();
