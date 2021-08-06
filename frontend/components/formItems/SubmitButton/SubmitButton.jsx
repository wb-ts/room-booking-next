import styles from "./SubmitButton.module.scss";
const SubmitButton = ({
  disabled,
  text,
  off,
  onClick,
  disabledText = "Please Wait....",
}) => {
  return (
    <button
      disabled={disabled || off}
      style={{ backgroundColor: disabled || off ? "grey" : "#259a7a" }}
      className={styles.submitButton}
      onClick={onClick ? onClick : (e) => {}}
    >
      {disabled ? (
        <p className={styles.submitButton__text}>{disabledText}</p>
      ) : (
        <p className={styles.submitButton__text}>{text}</p>
      )}
    </button>
  );
};

export default SubmitButton;
