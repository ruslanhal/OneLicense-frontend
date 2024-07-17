import Button from "@/components/Button/Button";
import Logo from "../../assets/logo.svg";
import NotIcon from "@/assets/notifications.Icon.svg";

import {authHook} from "@/apiClient/hooks/authHooks";
import {useState} from "react";
import UserDropdown from "@/components/UserDropdown/UserDropdown";

import {useQueryClient} from "@tanstack/react-query";
import {IUser} from "@/common/types/user.types";

const Header = () => {
  // const {user} = authHook();
  // const data = queryClient.getQueryData(["profile"]);
  // console.log("-=-=-=-=-=data in header", data);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>(["profile"]);
  console.log("-=-=-=-=-=user in header", user);

  return (
    <header>
      <div className="mb-16">
        <div className="flex justify-center items-center mt-[70px] mb-[34px] ">
          <img src={Logo} />
        </div>

        <div className="flex justify-center items-center gap-2">
          <Button styleType="button_header" text="Projects" />
          <Button styleType="button_header" text="Licenses" />
          <input
            placeholder="Search project"
            className=" w-72 h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full text-center  focus:outline-none"
          ></input>

          <div className="flex justify-center items-center min-w-[40px] min-h-[40px] w-[40px] h-[40px] bg-[#F9F9F9] border-[#EAEAEA]  border-[1px] rounded-full">
            <img src={NotIcon} />
          </div>

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
