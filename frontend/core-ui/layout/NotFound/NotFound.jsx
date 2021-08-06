import Link from "next/link";
import styles from "./NotFound.module.scss";
const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <p className={styles.notFound__404}>404!</p>
      <h3 className={styles.notFound__text}>Page Does Not Exist</h3>
      <Link passHref href="/">
        <h3 className={styles.notFound__link}>Back To Home</h3>
      </Link>
    </div>
  );
};

export default NotFound;
