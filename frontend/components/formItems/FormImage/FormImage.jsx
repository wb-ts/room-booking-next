import Image from "next/image";
import styles from "./FormImage.module.scss";

const FormImage = ({ label, src, onChange, name }) => {
  return (
    <div className={styles.formImage}>
      <h4>{label}</h4>
      <label className={styles.formImage__label}>
        <figure className={styles.formImage__label__avatar}>
          <Image src={src} alt="name" layout="fixed" width={50} height={50} />
        </figure>
        <input
          className={styles.formImage__label__input}
          type="file"
          name={name}
          accept="/images/*"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default FormImage;
