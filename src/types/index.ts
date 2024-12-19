export interface Employee {
  _id: string;
  name: string;
  employee_id: string;
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
  service_id: string;
  description: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
  isEnabled?: boolean;
  data?: string;
}

export interface Order {
  _id: string;
  order_id: string;
  delivery_status: string;
  status: string;
  order_date: Date;
  product_id: string;
  customer_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Payment {
  _id: string;
  payment_id: string;
  order_id: string;
  customer_id: string;
  amount: string;
  payment_method: string;
  payment_date: Date;
  status: string;
  employee_id: string;
  product_id:string;
  payment_details: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Customer{
  _id: string;
  customer_id: string;
  name: string;
  mail: string;
  contact: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Role {
  _id: string;
  name: string;
  privileges: {
    viewDashboard: boolean;
    manageEmployees: boolean;
    manageRoles: boolean;
    viewReports: boolean;
    manageSettings: boolean;
    accessAuditLogs: boolean;
  };
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



export type Product = {
  _id: string;
  product_id: string;
  product_type: string;
  serial_number: string;
  model_number: string;
  problem: string;
  status: string;
  description?: string;
  customer_id: string;
  created_at: string;
  updated_at: string;
};


export interface RegisterCredentials
  extends Omit<Employee, "_id" | "createdAt" | "updatedAt"> {}
