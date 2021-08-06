import { ReplayIcon } from "@icons/iconsIndex";
import styles from "./FormTextBox.module.scss";

const FormTextBox = ({
  value,
  setValue,
  label,
  onChange,
  name,
  placeholder,
  clear,
}) => {
  return (
    <label className={styles.formTextBox}>
      <h5>{label}</h5>
      <textarea
        className={styles.formTextBox__box}
        name={name}
        rows={10}
        cols={40}
        value={value || ""}
        onChange={onChange || ((e) => setValue(e.target.value))}
        placeholder={placeholder || ""}
      />
      <button onClick={clear} className={styles.formTextBox__clear}>
        <ReplayIcon />
      </button>
    </label>
  );
};

export default FormTextBox;
