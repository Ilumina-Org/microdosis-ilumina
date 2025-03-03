export interface StockItem {
  sku: string;
  title: string;
  price: number;
  regularPrice: number;
  imageUrl: string;
  tier: number;
  link: string;
  disponible: number;
  reservado: number;
  total: number;
  notas: string;
  featured: boolean;
  tipo: 'package' | 'subscription';
}

export interface Order {
  orderId: string;
  date: string;
  status: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    sku: string;
    quantity: number;
  }>;
  total: number;
}
