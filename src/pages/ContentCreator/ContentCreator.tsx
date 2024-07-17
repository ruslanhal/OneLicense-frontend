import React,{useState} from "react";
import styles from "./ContentCreator.module.scss";
import DeleteAccount from "../../assets/DeleteAccount.svg";
import LogOut from "../../assets/LogOut.svg";
import ChevronDown from "../../assets/ChevronDown.svg";

export default function ContentCreator() {
  const [isAUDOpened, setIsAUDOpened]=useState(false);
  return (
    <div className={styles.contantCreatorContainer}>
      <div className={styles.contantCreatorHeader}>
        <h1 className={styles.contantCreatorTitle}>Timothy Kaye</h1>
        <span className={styles.contantCreatorSpan}>Content Creator</span>
        <img src={LogOut} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.contentItem}>
          <div className={styles.contentItemTitle}>Change Password</div>

          <span className={styles.contentItemSpan}>Username</span>
          <span className={styles.contentItemUserName}>Timothy Kaye</span>

          <span className={styles.contentItemSpan}>Email Address</span>
          <span className={styles.contentItemUserName}>
            mail@timothykaye.com
          </span>

          <div className={styles.buttons}>
            <input
              className={styles.contentItemInput}
              placeholder="Current Password"
            />
            <input
              className={styles.contentItemInput}
              placeholder="New Password"
            />
            <input
              className={styles.contentItemInput}
              placeholder="Retype Password"
            />

            <button className={styles.contentItemButtonSubmit}>Submit</button>
          </div>

          <div className={styles.forgotPassword}>Forgot my password?</div>
        </div>

        <div className={styles.contentItemTwo}>
          <div className={styles.contentItem}>
            <div className={styles.contentItemTitle}>Price Per Image</div>
            <div className={styles.priceContainer}>
              <button className={styles.priceButton}>$15</button>

              <div className={styles.priceButtonSelect}>
                <button className={styles.priceButton} onClick={()=>setIsAUDOpened(!isAUDOpened)}>AUD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                <img src={ChevronDown} className={styles.chevronDown}/>

                {isAUDOpened?<ul className={styles.AUDList}>
                  <li className={styles.AUDListItem} onClick={()=>setIsAUDOpened(false)}>AUD</li>
                </ul>:null}
              </div>
            </div>
          </div>

          <div className={styles.contentItem}>
            <div className={styles.contentItemTitle}>Total Sales</div>
            <div className={styles.totalSalesPrice}>$75.00 AUD</div>
          </div>
        </div>

        <div className={styles.contentItem}>
            <div className={styles.contentItemTitle}>Delete Account</div>
            <span className={styles.contentItemDeleteAccountText}>
            This will permanently delete all 
            projects, licenses and information from Editions. This cannot be undone
            </span>

            <img src={DeleteAccount} />
          </div>
      </div>
    </div>
  );
}
