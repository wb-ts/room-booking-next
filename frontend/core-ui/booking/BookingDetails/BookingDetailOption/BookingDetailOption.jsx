import styles from "./BookingDetailOption.module.scss";

const BookingDetailOption = ({ title, data }) => {
  return (
    <div className={styles.bookingDetailOption}>
      <h3 className={styles.bookingDetailOption__title}>{title}</h3>
      <div className={styles.bookingDetailOption__body}>
        {Object.entries(data).map(([key, value]) => (
          <div className={styles.bookingDetailOption__body__data} key={key}>
            <h5>{key}:</h5>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingDetailOption;
