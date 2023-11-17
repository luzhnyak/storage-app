export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  category_id: number;
  image: string;
}
