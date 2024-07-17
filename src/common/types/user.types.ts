export interface IUser {
  id: string;
  email: string;
  isActive: boolean;
  supplierData?: ISupplierData;
  creatorData?: ICreatorData;
  role: "supplier" | "creator";
}

export interface ISupplierData {
  id: string;
  businessName: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatorData {
  id: string;
  firstName: string;
  surname: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
