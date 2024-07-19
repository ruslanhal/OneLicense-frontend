import React, {useState} from "react";
import Button from "../Button/Button";

import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

import {CreatorSchema, type TCreatorSchema} from "@/pages/Auth/types/types";
import {useNavigate} from "react-router-dom";
import {ISignUpReq} from "@/apiClient/types/auth.reqs.types";
import {signUp} from "@/apiClient/services/auth/auth.service";
import styles from './styles/InputStyles.module.scss';

type Props = {};

interface ReqError {
  isError: boolean;
  statusText: string;
}

const CreatorSignUpForm = (props: Props) => {
  const [reqError, setReqError] = useState<ReqError>({
    isError: false,
    statusText: "string",
  });

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TCreatorSchema>({
    resolver: zodResolver(CreatorSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TCreatorSchema) => {
    try {
      console.log("-=-=-=-=-=-=-=-=data", data);
      const reqPayload: ISignUpReq = {
        role: "creator",
        userData: {email: data.email, password: data.password},
        creatorData: {firstName: data.firstName, surname: data.surname},
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
          name="firstName"
          control={control}
          render={({field}) => (
            <>
              {errors.firstName?.message && (
                <span className="text-red-700">
                  {errors.firstName?.message}
                </span>
              )}
              <input
                {...field}
                placeholder="First name"
                className={styles.input}
              />
            </>
          )}
        />

        <Controller
          name="surname"
          control={control}
          render={({field}) => (
            <>
              {errors.surname?.message && (
                <span className=" text-red-700">{errors.surname?.message}</span>
              )}
              <input
                {...field}
                placeholder="Surname"
                className={styles.input}
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
                className={styles.input}
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
                className={styles.input}
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

export default CreatorSignUpForm;
