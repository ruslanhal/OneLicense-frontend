import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import {IUser} from "@/common/types/user.types";
import {logout} from "@/apiClient/services/auth/auth.service";

interface Props {
  user: IUser | undefined;
}

const UserDropdown: React.FC<Props> = ({user}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Додаємо обробник кліку на документ для закриття меню
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false); // Закриваємо меню, якщо клік був поза меню
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleItemClick = (item: string) => {
    console.log("Clicked item:", item);
    // Handle item click logic here
    setMenuOpen(false); // Close menu after item click
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center">
        <div className="group cursor-pointer">
          <span onClick={handleMenuClick}>
            {user?.role === "creator"
              ? user?.creatorData?.firstName
              : user?.supplierData?.businessName}
            <hr className="absolute bottom-0 left-0 w-full border-black" />
          </span>
        </div>
      </div>

      {menuOpen && (
        <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
          <li
            onClick={() => handleItemClick("Profile")}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </li>

          <li
            onClick={() => handleLogout()}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
