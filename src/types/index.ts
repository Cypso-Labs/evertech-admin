export interface Employee {
  _id: string;
  name: string;
  leave?: string;
  address: string;
  gender: string;
  age: string;
  join_date: Date;
  contact?: string;
  email: string;
  username: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Service {
  _id: string;
  name: string;
  category_id: string;
  opt_expire_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  _id: string;
  order_id: string;
  qty: number;
  status: string;
  sub_total: string;
  unit_price: number;
  grand_total: number;
  order_date: Date;
  product_id: string;
  customer_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Role {
  _id: string;
  name: string;
  access_privilege: number[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthState {
  user: Employee | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}


export interface SigninCredentials {
  email: string;
  password: string;
}


 export interface LoginResponse {
  success: boolean;
  data?: {
    user: Employee;
    token: string;
  };
  message?: string;
  token?: string;
  user?: Employee;
}

export interface RegisterCredentials
  extends Omit<Employee, "_id" | "createdAt" | "updatedAt"> {}
