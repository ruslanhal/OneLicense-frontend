import Button from "@/components/Button/Button";
import Logo from "../../assets/logo.svg";
import Notification from "@/assets/Notification/Notification";
import Basket from "@/assets/Basket";

import {authHook} from "@/apiClient/hooks/authHooks";
import {useState} from "react";
import UserDropdown from "@/components/UserDropdown/UserDropdown";

import {useQueryClient} from "@tanstack/react-query";
import {IUser} from "@/common/types/user.types";
import styles from './Header.module.scss'
import { Link } from "react-router-dom";

interface HeaderProps{
  isSupplier?:boolean;
}

const Header = ({isSupplier}:HeaderProps) => {
  // const {user} = authHook();
  // const data = queryClient.getQueryData(["profile"]);
  // console.log("-=-=-=-=-=data in header", data);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>(["profile"]);
 // console.log("-=-=-=-=-=user in header", user);

  return (
    <header>
      <div className="mb-16">
        <div className="flex justify-center items-center mt-[70px] mb-[34px] ">
          <img src={Logo} />
        </div>

        <div className="flex justify-center items-center gap-2">
          <Link to="/"><Button styleType="button_header" text="Projects" /></Link>
          <Link to="/licenses"><Button styleType="button_header" text="Licenses" /></Link>
          <input
            placeholder="Search project"
            className={styles.input}
          ></input>

          {isSupplier?<Basket />:<Notification />}

          {/* <div>
            <span className="underline cursor-pointer">
              {user?.role === "creator"
                ? user?.creatorData?.firstName
                : user?.supplierData?.businessName}{" "}
            </span>
          </div> */}
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
