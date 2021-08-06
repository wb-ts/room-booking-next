import { getDate, getInvoice } from "@helpers/helpersIndex";
import { GetAppIcon, VisibilityIcon, DeleteIcon } from "@icons/iconsIndex";
import { deleteBooking } from "@redux/reducers/admin/adminBookingSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./AllBookinksTableOptions.module.scss";

const AllBookinksTableOptions = ({ booking, heading, last }) => {
  const dispatch = useDispatch();
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

  const bookingDelete = (e) => {
    e.preventDefault();
    const id = bookingId;
    dispatch(deleteBooking(id));
  };
  return (
    <div
      className={styles.allBookinksTableOptions}
      style={{
        borderBottom: last && "1px solid black",
        backgroundColor: heading && "rgb(235, 235, 235)",
      }}
    >
      <div className={styles.allBookinksTableOptions__sections}>
        {heading ? (
          <p
            className={styles.allBookinksTableOptions__sections__room__heading}
          >
            {room}
          </p>
        ) : (
          <p className={styles.allBookinksTableOptions__sections__room}>
            <Link passHref href={`/room/${roomId}`}>
              {roomId}
            </Link>
          </p>
        )}
      </div>

      <div
        className={`${styles.allBookinksTableOptions__sections} ${styles.allBookinksTableOptions__sections__dates}`}
      >
        <div
          className={styles.allBookinksTableOptions__sections__dates__container}
        >
          <p
            className={`${styles.allBookinksTableOptions__sections__dates__container__text}`}
          >
            CheckIn:
          </p>

          <p
            className={`${styles.allBookinksTableOptions__sections__dates__container__value}`}
          >
            {heading ? checkInDate : getDate(checkInDate)}
          </p>
        </div>
        <div
          className={styles.allBookinksTableOptions__sections__dates__container}
        >
          <p
            className={`${styles.allBookinksTableOptions__sections__dates__container__text}`}
          >
            Checkout:
          </p>

          <p
            className={`${styles.allBookinksTableOptions__sections__dates__container__value}`}
          >
            {heading ? checkOutDate : getDate(checkOutDate)}
          </p>
        </div>
        <div
          className={`${styles.allBookinksTableOptions__sections__dates__container} ${styles.allBookinksTableOptions__sections__dates__container__paid}`}
        >
          <p
            className={`${styles.allBookinksTableOptions__sections__dates__container__text}`}
          >
            Paid:
          </p>
          <p
            className={`${styles.allBookinksTableOptions__sections__dates__container__value}`}
          >
            {heading ? amountPaid : `₹${amountPaid}`}
          </p>
        </div>
      </div>

      <div
        className={`${styles.allBookinksTableOptions__sections} ${styles.allBookinksTableOptions__sections__button}`}
      >
        {heading ? (
          <p className={styles.allBookinksTableOptions__sections__actions}>
            Actions
          </p>
        ) : (
          <div className={styles.allBookinksTableOptions__sections__actions}>
            <p
              onClick={downloadInvoice}
              className={`${styles.allBookinksTableOptions__sections__actions__button} ${styles.allBookinksTableOptions__sections__actions__button__download}`}
            >
              <GetAppIcon />
            </p>
            <Link passHref href={`/admin/bookings/${bookingId}`}>
              <p
                className={`${styles.allBookinksTableOptions__sections__actions__button} ${styles.allBookinksTableOptions__sections__actions__button__view}`}
              >
                <VisibilityIcon />
              </p>
            </Link>
            <p
              onClick={bookingDelete}
              className={`${styles.allBookinksTableOptions__sections__actions__button} ${styles.allBookinksTableOptions__sections__actions__button__delete}`}
            >
              <DeleteIcon />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookinksTableOptions;
