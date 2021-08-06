import styles from "./FormLayout.module.scss";

const FormLayout = ({ children, onSubmit, header, subHeader, footer }) => {
  return (
    <div className={styles.formLayout}>
      <div className={styles.formLayout__body}>
        <div className={styles.formLayout__body__heading}>
          <h2 className={styles.formLayout__body__heading__top}>{header}</h2>
          {subHeader && (
            <p className={styles.formLayout__body__heading__bottom}>
              {subHeader}
            </p>
          )}
        </div>
        <form
          className={styles.formLayout__body__container}
          onSubmit={onSubmit}
        >
          {children}
        </form>
        {footer}
      </div>
    </div>
  );
};

export default FormLayout;
