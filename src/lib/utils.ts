export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2
  }).format(amount);
}

export function generateOrderId() {
  return `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}
