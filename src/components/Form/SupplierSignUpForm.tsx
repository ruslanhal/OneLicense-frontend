import Button from "../Button/Button";

import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

import {SupplierSchema, type TSupplierSchema} from "@/pages/Auth/types/types";
import {ISignUpReq, signUp} from "@/apiClient/apiClient";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface IProps {}

interface ReqError {
  isError: boolean;
  statusText: string;
}

const SupplierSignUpForm = () => {
  const [reqError, setReqError] = useState<ReqError>({
    isError: false,
    statusText: "string",
  });

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TSupplierSchema>({
    resolver: zodResolver(SupplierSchema),
    defaultValues: {
      businessName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TSupplierSchema) => {
    try {
      console.log("-=-=-=-=-=-=-=-=data", data);
      const reqPayload: ISignUpReq = {
        role: "supplier",
        userData: {email: data.email, password: data.password},
        supplierData: {businessName: data.businessName},
      };
      const respData = await signUp(reqPayload);
      console.log("-=-=-=-=-resp", respData);
      navigate("/");
    } catch (error) {
      setReqError({isError: true, statusText: String(error)});
      console.log("-=-=-=-=-=reqError", reqError);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-[10px]"
      >
        <Controller
          name="businessName"
          control={control}
          render={({field}) => (
            <>
              {errors.businessName?.message && (
                <span className="text-red-700">
                  {errors.businessName?.message}
                </span>
              )}
              <input
                {...field}
                placeholder="Business Name"
                className="w-[300px] h-[40px] rounded-full text-center  focus:outline-none"
              />
            </>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({field}) => (
            <>
              {errors.email?.message && (
                <span className="error-message text-red-700">
                  {errors.email?.message}
                </span>
              )}
              <input
                {...field}
                placeholder="Email"
                className="w-[300px] h-[40px] rounded-full text-center focus:outline-none"
              />
            </>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({field}) => (
            <>
              {errors.password?.message && (
                <span className="error-message text-red-700">
                  {errors.password?.message}
                </span>
              )}
              <input
                {...field}
                placeholder="Password"
                type="password"
                className="w-[300px] h-[40px] rounded-full text-center focus:outline-none"
              />
            </>
          )}
        />

        <Button text="Sign up" styleType="button_dark" />
      </form>
      {reqError.isError && (
        <span className="error-message text-red-700 mt-4">
          {reqError.statusText}
        </span>
      )}
    </>
  );
};

export default SupplierSignUpForm;
