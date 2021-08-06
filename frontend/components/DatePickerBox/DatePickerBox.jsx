import { ConfirmButton } from "@components/componentsIndex";
import { ReplayIcon } from "@icons/iconsIndex";
import {
  checkBookingSlot,
  clearBookingSlot,
} from "@redux/reducers/booking/bookingSlotSlice";
import { clearCheckOut } from "@redux/reducers/payment/checkOutSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DatePickerBox.module.scss";
const DatePickerBox = ({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  setShowDateBox,
  excludeDates,
  onChange,
  reset,
  onConfirm,
}) => {
  const dispatch = useDispatch();
  const handleCancel = (e) => {
    e.preventDefault();
    setCheckInDate(null);
    setCheckOutDate(null);
    setShowDateBox(false);
    dispatch(clearBookingSlot());
    dispatch(clearCheckOut());
  };
  // const handleReset = (e) => {
  //   e.preventDefault();
  //   setCheckInDate(null);
  //   setCheckOutDate(null);
  //   dispatch(clearBookingSlot());
  // };

  const { available, status, error } = useSelector(checkBookingSlot());

  return (
    <div className={styles.datePickerBox}>
      <DatePicker
        selected={checkInDate}
        onChange={onChange}
        startDate={checkInDate}
        minDate={new Date()}
        endDate={checkOutDate}
        excludeDates={excludeDates}
        selectsRange
        inline
      />

      <div className={styles.datePickerBox__notify}>
        {status !== "success" ? (
          !checkInDate ? (
            <p
              className={`${styles.datePickerBox__notify__message} ${styles.datePickerBox__notify__message__info}`}
            >
              Select Checkin Date
            </p>
          ) : (
            <p
              className={`${styles.datePickerBox__notify__message} ${styles.datePickerBox__notify__message__info}`}
            >
              Select CheckOut Date
            </p>
          )
        ) : available ? (
          <p
            className={`${styles.datePickerBox__notify__message} ${styles.datePickerBox__notify__message__available}`}
          >
            Booking Available
          </p>
        ) : (
          <p
            className={`${styles.datePickerBox__notify__message} ${styles.datePickerBox__notify__message__unavailable}`}
          >
            Booking Unavailable
          </p>
        )}
        <p onClick={reset} className={styles.datePickerBox__notify__reset}>
          <ReplayIcon />
        </p>
      </div>

      <div className={styles.datePickerBox__buttons}>
        <ConfirmButton
          disabled={!available}
          text="Confirm"
          onClick={() => {
            onConfirm();
            setShowDateBox(false);
          }}
        />

        <ConfirmButton text="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );
};

export default DatePickerBox;
