-- Database schema for Jewelry Point of Sale

-- Tipo para estatus de pedidos
create type order_status as enum (
  'pendiente',
  'confirmado',
  'pagado',
  'cancelado',
  'entregado'
);

-- Categorías de producto
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Productos
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(12,2) not null default 0,
  sku text unique,
  stock integer not null default 0,
  category_id uuid references categories(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Imágenes de productos
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Usuarios admin
create table admin_users (
  id uuid primary key default gen_random_uuid(),
  auth_uid uuid not null unique references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Pedidos / ventas
create table orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status order_status not null default 'pendiente',
  customer_name text not null,
  customer_email text,
  customer_phone text,
  shipping_address text,
  note text,
  total numeric(12,2) not null default 0,
  payment_method text,
  admin_notes text
);

-- Items de pedido
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  quantity integer not null default 1,
  unit_price numeric(12,2) not null,
  subtotal numeric(12,2) not null,
  created_at timestamptz not null default now()
);

-- Egresos
create table expenses (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  amount numeric(12,2) not null,
  category text not null,
  vendor text,
  note text,
  receipt_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
