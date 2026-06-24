export interface Variant {
  id: string;
  label: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  badge?: string;         
  comparePrice?: number;  
  price: number;
  variants: Variant[]; 
  isFree?: boolean;      
  priceLabel?: string;     
}

export interface Step {
  id: string;
  label: string;
  stepNumber: number;
  products: Product[];
}

export interface Selections {
  [variantId: string]: number;
}

export interface ActiveVariants {
  [productId: string]: string; 
}