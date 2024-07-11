import React from "react";

import Logo from "../assets/logo_white.svg";
import {Outlet} from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <div className="h-screen pt-[70px] bg-[#111111] flex flex-col  items-center">
      <div className="flex justify-center items-center  mb-36 ">
        <img src={Logo} />
      </div>
      <Outlet />
      <div className="absolute bottom-24 text-center">
        <p className="text-[#444444]">By continuing, you agree to our</p>
        <p className="text-[#444444]">
          Terms Of Service and Privacy & Cookie Statement.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
