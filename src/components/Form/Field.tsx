// import {CreatorFormData} from "@/pages/Auth/types/types";
// import {Path, UseFormRegister} from "react-hook-form";

// interface FormFieldProps {
//   type: string;
//   placeholder: string;
//   name: Path<CreatorFormData>;
//   register: UseFormRegister<CreatorFormData>;
//   error: any;
//   valueAsNumber?: boolean;
// }

// function FormField({
//   type,
//   placeholder,
//   name,
//   register,
//   error,
//   valueAsNumber,
// }: FormFieldProps) {
//   return (
//     <>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(name, {valueAsNumber})}
//         className="w-[300px] h-[40px] rounded-full text-center focus:outline-none"
//       />
//       {error && <span className="error-message">{error.message}</span>}
//     </>
//   );
// }
// export default FormField;
