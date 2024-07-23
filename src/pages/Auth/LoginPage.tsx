import React, {useState} from "react";
import Button from "../../components/Button/Button";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {z, ZodType} from "zod";
import {ILoginReq} from "@/apiClient/types/auth.reqs.types";
import {login} from "@/apiClient/services/auth/auth.service";
import styles from "./Auth.module.scss";

type Props = {};

interface ReqError {
  isError: boolean;
  statusText: string;
}

const Login = (props: Props) => {
  const [reqError, setReqError] = useState<ReqError>({
    isError: false,
    statusText: "string",
  });

  const navigate = useNavigate();

  const LoginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, {message: "Password is too short"})
      .max(20, {message: "Password is too long"}),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginReq>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginReq) => {
    try {
      const respData = await login(data);
      navigate("/");
    } catch (error) {
      console.log("-=-=-=-=-=-error in comp catch-==-=-=-", error);
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
          name="email"
          control={control}
          render={({field}) => (
            <>
              {errors.email?.message && (
                <span className="error-message text-red-700">
                  {errors.email?.message}
                </span>
              )}
              <input {...field} placeholder="Email" className={styles.input} />
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
                className={styles.input}
              />
            </>
          )}
        />

        <Button text="Login" styleType="button_dark" />
      </form>
      {reqError.isError && (
        <span className="error-message text-red-700 mt-4">
          {reqError.statusText}
        </span>
      )}
    </>
  );
};

export default Login;

{
  /* 
    return (
    <div className="flex flex-col items-center gap-[10px]">
      <input
        placeholder="Email"
        className="w-[300px] h-[40px] rounded-full text-center focus:outline-none"
      ></input>
      <input
        placeholder="Password"
        className="w-[300px] h-[40px] rounded-full text-center mb-[15px] focus:outline-none"
      ></input>
      <Button text="Login" styleType="button_dark" />
      <Link to="/">Forgot my password?</Link>
      <Link to="signup">Sign Up</Link>
    </div> */
}
