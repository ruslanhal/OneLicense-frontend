import React from "react";
import styles from "./Project.module.scss";

type Props = {
  title: string;
  author: string;
  imageUrl: string;
};

const Project = ({ title, author, imageUrl }: Props) => {
  return (
    <div className={styles.container}>
      <img src={imageUrl} />
      <div className={styles.projectInfo}>
        <p className={styles.title}>{title}</p>
        <p className={styles.span}>{author}</p>
      </div>
    </div>
  );
};
``;
export default Project;
