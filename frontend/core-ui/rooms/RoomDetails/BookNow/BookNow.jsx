import styles from "./BookNow.module.scss";

const BookNow = () => {
  return (
    <button
      className={styles.paymentBox__book}
      onClick={bookingHandler}
      style={{ backgroundColor: daysOfStay < 1 && "gray" }}
      disabled={daysOfStay < 1 ? true : false}
    >
      Book Now
    </button>
  );
};

export default BookNow;
