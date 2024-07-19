import React, {useRef} from "react";
import {IUser} from "@/common/types/user.types";
import styles from "./UserDropdowm.module.scss";
import {Link} from "react-router-dom";

interface Props {
  user: IUser | undefined;
}

const UserDropdown: React.FC<Props> = ({user}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center">
        <div className="group cursor-pointer">
          <Link to="/profile">
            <span className={styles.username}>
              {user?.role === "creator"
                ? `${user?.creatorData?.firstName} ${user?.creatorData?.surname}`
                : user?.supplierData?.businessName}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
