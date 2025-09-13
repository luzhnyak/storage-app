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
  userId: number;
  contragentId: number;
  createdAt: Date;
  updatedAt: Date;
  comment?: string;
  order_products?: IOrderProduct[];
  suma?: number;
}

export interface IOrderProduct {
  id: number;
  orderId: number;
  name: string;
  productId: number;
  quantity: number;
  price: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image: string;
}

export interface IQueryProducts {
  categoryId: number;
  page: number;
}
