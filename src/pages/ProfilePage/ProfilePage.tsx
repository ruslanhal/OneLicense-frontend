import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.scss";
import ChevronDown from "../../assets/ChevronDown.svg";
import LogOut from "@/assets/LogOut";
import DeleteAccount from "@/assets/DeleteAccount";
import { logout } from "@/apiClient/services/auth/auth.service";
import { IUser } from "@/common/types/user.types";
import { AxiosError } from "axios";
import { axiosClient } from "@/apiClient/apiClient";
import { useState } from "react";

const fetchUserProfile = async (): Promise<IUser> => {
  const response = await axiosClient.get("/auth/me");
  return response.data;
};

export default function ProfilePage() {
  const [isAUDOpened, setIsAUDOpened] = useState(false);
  const [price, setPrice] = useState("$15");

  const { data: user, isLoading, error } = useQuery<IUser, AxiosError>({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
  });

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.contantCreatorContainer}>
      <div className={styles.contantCreatorHeader}>
        <h1 className={styles.contantCreatorTitle}>
          {user?.role === "creator"
            ? `${user?.creatorData?.firstName} ${user?.creatorData?.surname}`
            : user?.supplierData?.businessName}
        </h1>
        <span className={styles.contantCreatorSpan}>
          {user?.role === "creator" ? "Content Creator" : "Supplier"}
        </span>
        <LogOut onClick={handleLogout} />
      </div>

      <div className={styles.contentContainer} style={user?.role==="supplier"?{width:'50%'}:{}}>
        <div className={styles.contentItem}>
          <div className={styles.contentItemTitle}>Change Password</div>

          <span className={styles.contentItemSpan}>Username</span>
          <span className={styles.contentItemUserName}>
            {user?.role === "creator"
              ? `${user?.creatorData?.firstName} ${user?.creatorData?.surname}`
              : user?.supplierData?.businessName}
          </span>

          <span className={styles.contentItemSpan}>Email Address</span>
          <span className={styles.contentItemUserName}>{user?.email}</span>

          <div className={styles.buttons}>
            <input className={styles.contentItemInput} placeholder="Current Password" />
            <input className={styles.contentItemInput} placeholder="New Password" />
            <input className={styles.contentItemInput} placeholder="Retype Password" />

            <button className={styles.contentItemButtonSubmit}>Submit</button>
          </div>

          <div className={styles.forgotPassword}>Forgot my password?</div>
        </div>

        {user?.role==="creator"?<div className={styles.contentItemTwo}>
          <div className={styles.contentItem}>
            <div className={styles.contentItemTitle}>Price Per Image</div>
            <div className={styles.priceContainer}>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.priceButton}
              />

              <div className={styles.priceButtonSelect}>
                <button
                  className={styles.priceButton}
                  onClick={() => setIsAUDOpened(!isAUDOpened)}
                >
                  AUD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
                <img src={ChevronDown} className={styles.chevronDown} />

                {isAUDOpened ? (
                  <ul className={styles.AUDList}>
                    <li
                      className={styles.AUDListItem}
                      onClick={() => setIsAUDOpened(false)}
                    >
                      AUD
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.contentItem}>
            <div className={styles.contentItemTitle}>Total Sales</div>
            <div className={styles.totalSalesPrice}>$75.00 AUD</div>
          </div>
        </div>:null}

        <div className={styles.contentItem}>
          <div className={styles.contentItemTitle}>Delete Account</div>
          <span className={styles.contentItemDeleteAccountText}>
            This will permanently delete all projects, licenses and information from Editions. This cannot be undone
          </span>

          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
