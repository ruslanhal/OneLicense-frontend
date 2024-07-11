import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";

import {z, ZodType} from "zod"; // Add new import

// export type FormData = CreatorFormData | SupplierFormData;

// // Define a union type for form schemas
// export type FormSchema = ZodType<CreatorFormData> | ZodType<SupplierFormData>;

// export const CreatorSchema: ZodType<CreatorFormData> = z.object({
//   firstName: z.string(),
//   surname: z.string(),
//   email: z.string().email(),

//   password: z
//     .string()
//     .min(6, {message: "Password is too short"})
//     .max(20, {message: "Password is too long"}),
// });

// export const SupplierSchema: ZodType<SupplierFormData> = z.object({
//   businessName: z.string(),
//   email: z.string().email(),

//   password: z
//     .string()
//     .min(6, {message: "Password is too short"})
//     .max(20, {message: "Password is too long"}),
// });

// export type CreatorFormData = {
//   firstName: string;
//   surname: string;
//   email: string;
//   password: string;
// };

// export type SupplierFormData = {
//   businessName: string;
//   email: string;
//   password: string;
// };

// // Define a union type for form field props
// export type FormFieldProps<T extends FormData> = {
//   type: string;
//   placeholder: string;
//   name: keyof T; // Use keyof to ensure the name is a valid key of T
//   register: UseFormRegister<T>;
//   error: FieldError | undefined;
//   valueAsNumber?: boolean;
// };

export type CreatorValidFieldNames =
  | "firstName"
  | "surname"
  | "email"
  | "password";

export type SupplierValidFieldNames = "businessName" | "email" | "password";

export type TFormData = {
  [key: string]: string;
};

// Define generic props for form fields
export interface TFormFieldProps<TRegister extends FieldValues> {
  type: string;
  placeholder: string;
  name: Path<TRegister>;
  register: UseFormRegister<TRegister>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
}

export const CreatorSchema = z.object({
  firstName: z.string().min(3),
  surname: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(6, {message: "Password is too short"})
    .max(20, {message: "Password is too long"}),
});

export type TCreatorSchema = z.infer<typeof CreatorSchema>;

export const SupplierSchema = z.object({
  businessName: z.string().min(3),
  email: z.string().email(),

  password: z
    .string()
    .min(6, {message: "Password is too short"})
    .max(20, {message: "Password is too long"}),
});

export type TSupplierSchema = z.infer<typeof SupplierSchema>;

// export type CreatorFormFieldProps = {
//   type: string;
//   placeholder: string;
//   name: CreatorValidFieldNames;
//   register: UseFormRegister<CreatorFormData>;
//   error: FieldError | undefined;
//   valueAsNumber?: boolean;
// };

// export type SupplierFormFieldProps = {
//   type: string;
//   placeholder: string;
//   name: SupplierValidFieldNames;
//   register: UseFormRegister<SupplierFormData>;
//   error: FieldError | undefined;
//   valueAsNumber?: boolean;
// };

// export type CreatorValidFieldNames =
//   | "firstName"
//   | "surname"
//   | "email"
//   | "password";

// export type SupplierValidFieldNames = "businessName" | "email" | "password";
