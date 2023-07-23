export interface User {
  id: string;
  username: string;
  role: string[];
  stripe_account_id?: string;
  stripe_session_id?: string;
}

export interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  color: string;
  licensePlate: string;
  available: string;
  user?: User | string;
  seats?: number;
  price?: number;
  ratings?: number;
  image?: string;
  start_date?:string
  end_date?:string
}

export interface IOrder {
  _id: string;
  car?: Vehicle | string;
  booked_by?: User | string;
  isRead?: boolean;
}
export enum ROLES {
  USER = "USER",
  COMPANY = "COMPANY",
}
