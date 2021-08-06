import Link from "next/link";
import styles from "./Button.module.scss";

const Button = ({ text, page }) => {
  return (
    <Link passHref href={`/${page}`}>
      <button className={styles.button}>
        <p className={styles.button__text}>{text}</p>
      </button>
    </Link>
  );
};

export default Button;
