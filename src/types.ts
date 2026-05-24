export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'hogar' | 'iluminación' | 'accesorios';
  imageUrl: string;
  features: string[];
  dimensions: string;
  material: string;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type CategoryFilter = 'todos' | 'hogar' | 'iluminación' | 'accesorios';
