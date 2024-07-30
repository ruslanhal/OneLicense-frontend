import React, {useState} from "react";
import styles from "./Project.module.scss";
import {Link} from "react-router-dom";
import DelIcon from "@/assets/DelIcon";

type Props = {
  id: string;
  title: string;
  author: string;
  imageUrl: string | undefined;
};

const Project = ({id, title, author, imageUrl}: Props) => {
  const [confirmDeletionModal, setConfirmDeletionModal] = useState(false);

  console.log("-=-=-=-=-=id of project", id);
  return (
    <div>
      {/* <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-5 z-40 w-[100vw] h-[100vh] flex items-center justify-center">
        <div className="flex items-start flex-col bg-white p-5 w-[200px] h-fit rounded-md">
          <div className="flex items-center justify-between">
            <span>Are you sure you want to delete project?</span>
            
            </div>
        </div>
      </div> */}
      <Link to={`master-project/${id}`}>
        <div className={styles.container}>
          <div className={styles.img}>
            <img src={imageUrl} />
          </div>

          <button className={styles.deleteIcon}>
            <DelIcon />
          </button>

          <div className={styles.projectInfo}>
            <p className={styles.title}>{title}</p>
            <p className={styles.span}>{author}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
``;
export default Project;
