import Button from "@/components/Button/Button";
import Logo from "../../assets/logo.svg";
import Notification from "@/assets/Notification/Notification";
import Basket from "@/assets/Basket";
import { authHook } from "@/apiClient/hooks/authHooks";
import { useState } from "react";
import UserDropdown from "@/components/UserDropdown/UserDropdown";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import BasketSidebar from "../BasketSidebar/BasketSidebar";
import { useSearch } from "@/apiClient/contexts/SearchContext";


const Header = () => {
  // const {user} = authHook();
  // const data = queryClient.getQueryData(["profile"]);
  // console.log("-=-=-=-=-=data in header", data);
  const queryClient = useQueryClient();
  // console.log("-=-=-=-=-=user in header", user);
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  const { searchText, setSearchText } = useSearch();
  const { user, isLoading: isUserLoading } = authHook();

  const [search, setSearch]=useState("")

  const handleOpenSideBar = (value: boolean) => {
    setIsSideBarOpened(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value === '') {
      setSearchText('');
    }
  };

  return (
    <header>
      {isSideBarOpened ? <BasketSidebar close={handleOpenSideBar} /> : null}
      <div className="mb-16">
        <div className="flex justify-center items-center mt-[70px] mb-[34px] ">
          <img src={Logo} />
        </div>

        <div className="flex justify-center items-center gap-2">
          <Link to="/">
            <Button styleType="button_header" text="Projects" />
          </Link>
          <Link to="/licenses">
            <Button styleType="button_header" text="Licenses" />
          </Link>

          <form onSubmit={(e)=>{e.preventDefault();setSearchText(search);}}>
            <input
              value={search}
              onChange={handleInputChange}
              placeholder="Search project"
              className={styles.input}
            ></input>
          </form>

          {user?.role==='supplier' ? (
            <div onClick={() => setIsSideBarOpened(true)}>
              <Basket />
            </div>
          ) : (
            <Notification />
          )}

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
