import styles from "./ConfirmButton.module.scss";

const ConfirmButton = ({ text, onClick, disabled }) => {
  return (
    <button
      className={styles.confirmButton}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: disabled && "gray" }}
    >
      <p className={styles.confirmButton__text}>{text}</p>
    </button>
  );
};

export default ConfirmButton;
