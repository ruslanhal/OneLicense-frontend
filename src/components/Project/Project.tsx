import React from "react";
import styles from "./Project.module.scss";
import {Link} from "react-router-dom";

type Props = {
  id: string;
  title: string;
  author: string;
  imageUrl: string | undefined;
};

const Project = ({id, title, author, imageUrl}: Props) => {
  console.log("-=-=-=-=-=id of project", id);
  return (
    <Link to={`master-project/${id}`}>
      <div className={styles.container}>
        <img src={imageUrl} />
        <div className={styles.projectInfo}>
          <p className={styles.title}>{title}</p>
          <p className={styles.span}>{author}</p>
        </div>
      </div>
    </Link>
  );
};
``;
export default Project;
