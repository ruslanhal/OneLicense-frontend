import {useState} from "react";

import CreatorSignUpForm from "@/components/Form/CreatorSignUpForm";
import SupplierSignUpForm from "@/components/Form/SupplierSignUpForm";

const Signup = () => {
  const [roleState, setRolestate] = useState<"creator" | "supplier">("creator");

  // const schema = rolestate === "creator" ? CreatorSchema : SupplierSchema;
  // const formData = rolestate === "creator" ? CreatorFormData : SupplierFormData;

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setRolestate(e.target.value as "creator" | "supplier");
  };

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <select
        defaultValue=""
        onChange={handleRoleChange}
        className="w-[300px] h-[40px] rounded-full text-center text-[#888888] focus:outline-none appearance-none"
      >
        <option value="" disabled hidden>
          Account Type
        </option>
        <option value="creator">Creator</option>
        <option value="supplier">Supplier</option>
      </select>
      {roleState === "creator" ? <CreatorSignUpForm /> : <SupplierSignUpForm />}
    </div>
  );
};

export default Signup;
