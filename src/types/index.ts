export interface User {
  _id:string
  username: string
  email: string
  password: string
  role: ROLES[]
  otp: string
  reset_token: string
  mobile_number: string
  id_card_front: string
  id_card_back: string
  license: string
  security_fee: number
  stripe_account_id: string
  stripe_session_id: string,
  verified: boolean
  city: string
  lat: number
  long: number
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

export interface IFeedback {
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  message: string
}