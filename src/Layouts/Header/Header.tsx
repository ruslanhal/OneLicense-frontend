import Button from "@/components/Button/Button";
import Logo from "../../assets/logo.svg";
import Notification from "@/assets/Notification/Notification";
import Basket from "@/assets/Basket";
import { authHook } from "@/apiClient/hooks/authHooks";
import { useEffect, useState } from "react";
import UserDropdown from "@/components/UserDropdown/UserDropdown";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import BasketSidebar from "../BasketSidebar/BasketSidebar";
import { useSearch } from "@/apiClient/contexts/SearchContext";
import { getCart } from "@/apiClient/services/cart/cart.service";

const Header = () => {
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  const { setSearchText, cartLength, setCartLength } = useSearch();
  const { user, isLoading: isUserLoading } = authHook();

  const [search, setSearch] = useState("");

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

  const fetchItemsFromCart = async () => {
    try {
      const response = await getCart();
      const totalItems = response.cartProject.reduce((acc, project) => {
        return acc + project.cartProjectImage.length;
      }, 0);

      setCartLength(totalItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchItemsFromCart();
  }, []);

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

          <form onSubmit={(e) => { e.preventDefault(); setSearchText(search); }}>
            <input
              value={search}
              onChange={handleInputChange}
              placeholder="Search project"
              className={styles.input}
            ></input>
          </form>

          {user?.role === 'supplier' ? (
            <div onClick={() => setIsSideBarOpened(true)}>
              <Basket cartLength={cartLength} />
            </div>
          ) : (
            <Link to='/purchase'><Notification /></Link>
          )}
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
