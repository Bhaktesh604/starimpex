export interface IUser {
  _id: string;
  name: string;
  address: string;
  city: string;
  companyName: string;
  country: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
  state: string;
  status: string;
  mobileNumber: string;
  createdAt: string;
  updatedAt: string;
}

export enum ESupportRequestStatus {
  PENDING = "pending",
  RESOLVED = "resolved",
  CLOSED = "closed",
}

export enum EUserStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DISAPPROVED = "disapproved",
}
