import styles from "./ImageUploadCard.module.scss";
import DelIcon from "@/assets/DelIcon";

type Props = {
  title: string;
  author?: string;
  progress: number;
};

const ImageUploadCard = ({title, author, progress}: Props) => {
  return (
    <div className={styles.container}>
      {progress === 100 ? (
        <div className={styles.deleteIcon}>
          <DelIcon />
        </div>
      ) : null}

      <div className={styles.img}></div>
      <div
        className={styles.progressBar}
        style={{height: `${progress}%`}}
      ></div>

      <div className={styles.projectInfo}>
        <p className={styles.title}>{title}</p>
        <p className={styles.span}>{author}</p>
      </div>
    </div>
  );
};

export default ImageUploadCard;
