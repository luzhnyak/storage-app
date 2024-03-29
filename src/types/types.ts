export interface ICategory {
  id: number;
  name: string;
}

export interface IBrand {
  id: number;
  name: string;
}

export interface IOrder {
  id: number;
  user_id: number;
  contragent_id: number;
  createdAt: Date;
  updatedAt: Date;
  comment?: string;
  order_products?: IOrderProduct[];
  suma?: number;
}

export interface IOrderProduct {
  id: number;
  order_id: number;
  name: string;
  product_id: number;
  quantity: number;
  price: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: string;
}

export interface IQueryProducts {
  category_id: number;
  page: number;
}
