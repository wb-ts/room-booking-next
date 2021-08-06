import styles from "./FormInput.module.scss";

const FormInput = ({
  value,
  setValue,
  type,
  label,
  onChange,
  name,
  placeholder,
  required,
}) => {
  return (
    <label className={styles.formInput}>
      <h5>{label}</h5>
      <input
        className={styles.formInput__box}
        required={required}
        name={name || type}
        type={type}
        value={value || ""}
        onChange={onChange || ((e) => setValue(e.target.value))}
        placeholder={placeholder || ""}
      />
    </label>
  );
};

export default FormInput;
