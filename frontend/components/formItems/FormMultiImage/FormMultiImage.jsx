import { textTruncate } from "@helpers/helpersIndex";
import Image from "next/image";
import styles from "./FormMultiImage.module.scss";

const FormMultiImage = ({ label, images, onChange, name }) => {
  return (
    <div className={styles.formMultiImage}>
      <h4>{label}</h4>
      <label className={styles.formMultiImage__label}>
        <div className={styles.formMultiImage__label__images}>
          {images?.map((image) => (
            <figure
              key={image}
              className={styles.formMultiImage__label__images__preview}
            >
              <Image
                src={image}
                alt={image}
                layout="fixed"
                width={50}
                height={50}
              />
            </figure>
          ))}
        </div>
        <div className={styles.formMultiImage__label__select}>
          <p className={styles.formMultiImage__label__select__location}>
            {images.length > 0
              ? textTruncate(images[images.length - 1], 15)
              : "Choose Image"}
          </p>
          <input
            className={styles.formMultiImage__label__select__input}
            type="file"
            name={name}
            accept="/images/*"
            onChange={onChange}
            multiple
          />
          <h5 className={styles.formMultiImage__label__select__browse}>
            Browse
          </h5>
        </div>
      </label>
    </div>
  );
};

export default FormMultiImage;
