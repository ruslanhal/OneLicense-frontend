import React, {useState} from "react";
import styles from "./Project.module.scss";
import {Link} from "react-router-dom";
import DelIcon from "@/assets/DelIcon";
import {X} from "react-feather";
import Button from "../Button/Button";
import {authHook} from "../../apiClient/hooks/authHooks";

type Props = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | undefined;
  onDelete: () => Promise<void>;
};

const Project = ({id, title, description, imageUrl, onDelete}: Props) => {
  const [confirmDeletionModal, setConfirmDeletionModal] = useState(false);
  const {user} = authHook();

  const [isDeleting, setIsDeleting] = useState<string>("");

  const handleDelete = async () => {
    setIsDeleting(id);
    setConfirmDeletionModal(false);

    if (onDelete) {
      try {
        await onDelete();
      } catch (error) {
        setIsDeleting("");
        console.error("Error deleting image:", error);
      }
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmDeletionModal(true);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {confirmDeletionModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 z-40 w-[100vw] h-[100vh] flex items-center justify-center"
          onClick={() => setConfirmDeletionModal(false)}
        >
          <div
            className="flex items-start flex-col bg-white p-5 w-[400px] h-fit rounded-md"
            onClick={handleModalClick}
          >
            <div className="flex items-center justify-between w-full mb-5">
              <span className="font-semibold">
                Are you sure you want to delete the project?
              </span>
              <div onClick={() => setConfirmDeletionModal(false)}>
                <X className="h-[20px] cursor-pointer" />
              </div>
            </div>

            <div className="flex justify-center items-center w-full gap-6">
              <Button
                styleType="button_dark"
                text="Ok"
                onClick={() => handleDelete()}
              />
              <Button
                onClick={() => setConfirmDeletionModal(false)}
                text="Cancel"
                styleType="button_header"
              />
            </div>
          </div>
        </div>
      )}

      <Link to={`master-project/${id}`}>
        <div
          className={`${styles.container} ${
            isDeleting === id ? styles.deleting : ""
          }`}
        >
          <div className={styles.img}>
            <img src={imageUrl} alt={title} />
          </div>

          {user.role==='creator'?<button className={styles.deleteIcon} onClick={handleDeleteClick}>
            <DelIcon />
          </button>:null}

          <div className={styles.projectInfo}>
            <p className={styles.title}>{title}</p>
            <p className={styles.span}>{description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Project;
