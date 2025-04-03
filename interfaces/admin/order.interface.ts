import { IUser } from "../user/user.interface";

export interface Order {
  _id: string;
  grossAmount: number;
  orderDate: Date;
  orderNumber: string;
  shippingCharge: number;
  status: string;
  totalAdditionalCharges: number;
  totalAmount: number;
  totalCarats: number;
  totalStones: number;
  user: IUser;
  items: any;
}

export enum EOrderStatus {
  PENDING = "pending",
  CONFIRM = "confirm",
  PARTIALLY_CONFIRM = "partially_confirm",
  CANCELED = "canceled",
}
