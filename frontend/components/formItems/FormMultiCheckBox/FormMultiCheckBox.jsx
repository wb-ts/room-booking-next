import styles from "./FormMultiCheckBox.module.scss";
const FormMultiCheckBox = ({ options, title }) => {
  return (
    <div className={styles.formMultiCheckBox}>
      <h5 className={styles.formMultiCheckBox__title}>{title}</h5>
      <div className={styles.formMultiCheckBox__data}>
        {options.map((option) => (
          <label
            key={option.name}
            className={styles.formMultiCheckBox__data__label}
          >
            <input
              type="checkbox"
              className={styles.formMultiCheckBox__data__label__box}
              value={option.value}
              onChange={
                option.onChange || ((e) => option.setValue(e.target.checked))
              }
              checked={option.value}
            />
            <h5 className={styles.formMultiCheckBox__data__label__text}>
              {option.name}
            </h5>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FormMultiCheckBox;
