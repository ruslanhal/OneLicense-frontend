export interface ISignUpReq {
  role: "creator" | "supplier";
  userData: {
    email: string;
    password: string;
  };
  creatorData?: {
    firstName: string;
    surname: string;
  } | null;

  supplierData?: {
    businessName: string;
  } | null;
}

export interface ILoginReq {
  email: string;
  password: string;
}
