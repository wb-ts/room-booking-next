import styles from "./FormDropdown.module.scss";

const FormDropdown = ({
  dropdownList,
  label,
  value,
  name,
  onChange,
  setValue,
}) => {
  return (
    <label className={styles.formDropdown}>
      <h5 className={styles.formDropdown__label}>{label}</h5>
      <select
        className={styles.formDropdown__select}
        value={value}
        name={name}
        onChange={onChange || ((e) => setValue(e.target.value))}
      >
        {dropdownList?.map((list, i) => (
          <option
            className={styles.formDropdown__select__list}
            key={`${i}${list}`}
            value={list}
          >
            {list}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FormDropdown;
