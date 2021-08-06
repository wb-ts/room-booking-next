import { getDate, getInvoice } from "@helpers/helpersIndex";
import { GetAppIcon, VisibilityIcon } from "@icons/iconsIndex";
import Link from "next/link";
import styles from "./UserBookingTableOptions.module.scss";

const UserBookingTableOptions = ({ booking, heading, last }) => {
  const {
    room,
    amountPaid,
    checkInDate,
    checkOutDate,
    _id: bookingId,
  } = booking;

  const { pricePerNight, name: roomName, _id: roomId } = booking.room;

  const downloadInvoice = () => {
    const { daysOfStay } = booking;
    const { name, email } = booking.user;
    getInvoice({
      pricePerNight,
      bookingId,
      checkInDate,
      checkOutDate,

      daysOfStay,
      email,
      name,
      roomName,
    });
  };
  return (
    <div
      className={styles.userBookingTableOptions}
      style={{
        borderBottom: last && "1px solid black",
        backgroundColor: heading && "rgb(235, 235, 235)",
      }}
    >
      <div className={styles.userBookingTableOptions__sections}>
        {heading ? (
          <p
            className={styles.userBookingTableOptions__sections__room__heading}
          >
            {room}
          </p>
        ) : (
          <p className={styles.userBookingTableOptions__sections__room}>
            <Link passHref href={`/room/${roomId}`}>
              Room
            </Link>
          </p>
        )}
      </div>

      <div
        className={`${styles.userBookingTableOptions__sections} ${styles.userBookingTableOptions__sections__dates}`}
      >
        <div
          className={styles.userBookingTableOptions__sections__dates__container}
        >
          <p
            className={`${styles.userBookingTableOptions__sections__dates__container__text}`}
          >
            CheckIn:
          </p>

          <p
            className={`${styles.userBookingTableOptions__sections__dates__container__value}`}
          >
            {heading ? checkInDate : getDate(checkInDate)}
          </p>
        </div>
        <div
          className={styles.userBookingTableOptions__sections__dates__container}
        >
          <p
            className={`${styles.userBookingTableOptions__sections__dates__container__text}`}
          >
            Checkout:
          </p>

          <p
            className={`${styles.userBookingTableOptions__sections__dates__container__value}`}
          >
            {heading ? checkOutDate : getDate(checkOutDate)}
          </p>
        </div>
        <div
          className={`${styles.userBookingTableOptions__sections__dates__container} ${styles.userBookingTableOptions__sections__dates__container__paid}`}
        >
          <p
            className={`${styles.userBookingTableOptions__sections__dates__container__text}`}
          >
            Paid:
          </p>
          <p
            className={`${styles.userBookingTableOptions__sections__dates__container__value}`}
          >
            {heading ? amountPaid : `₹${amountPaid}`}
          </p>
        </div>
      </div>

      <div
        className={`${styles.userBookingTableOptions__sections} ${styles.userBookingTableOptions__sections__button}`}
      >
        {heading ? (
          <p className={styles.userBookingTableOptions__sections__invoice}>
            Invoice
          </p>
        ) : (
          <div className={styles.userBookingTableOptions__sections__acions}>
            <p
              onClick={downloadInvoice}
              className={`${styles.userBookingTableOptions__sections__acions__button} ${styles.userBookingTableOptions__sections__acions__button__download}`}
            >
              <GetAppIcon />
            </p>
            <Link passHref href={`/me/bookings/${bookingId}`}>
              <p
                className={`${styles.userBookingTableOptions__sections__acions__button} ${styles.userBookingTableOptions__sections__acions__button__view}`}
              >
                <VisibilityIcon />
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookingTableOptions;
