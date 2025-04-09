export interface Shirt {
  title: string;
  items: Items[];
}

export interface Items {
  size: string;
  variant: Variant[];
}
export interface Variant {
  color: string;
  stock?: number;
}
