import { DatePickerBox, ConfirmButton } from "@components/componentsIndex";
import { getFullDate, getStripe } from "@helpers/helpersIndex";
import { DateRangeIcon } from "@icons/iconsIndex";
import {
  bookedDatesSelector,
  getBookedDates,
} from "@redux/reducers/booking/bookedDatesSlice";
import { newBooking } from "@redux/reducers/booking/bookingSlice";
import {
  clearBookingSlot,
  getBookingSlot,
} from "@redux/reducers/booking/bookingSlotSlice";
import {
  checkoutSelector,
  clearCheckOut,
  getCheckout,
} from "@redux/reducers/payment/checkOutSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./PaymentBox.module.scss";

const PaymentBox = ({ room }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showDateBox, setShowDateBox] = useState(false);
  const [daysOfStay, setDaysOfStay] = useState(0);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { dates } = useSelector(bookedDatesSelector());
  const { sessionId, status, error } = useSelector(checkoutSelector());

  const { pricePerNight } = room;
  useEffect(() => {
    dispatch(getBookedDates(router.query.id));
  }, [dispatch, router]);
  const excludeDates = dates.map((date) => new Date(date));
  const dateChange = (dates) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    if (checkInDate && checkOutDate) {
      setDaysOfStay(
        Math.floor(
          (new Date(checkOutDate) - new Date(checkInDate)) /
            (24 * 60 * 60 * 1000) +
            1
        )
      );

      dispatch(
        getBookingSlot({
          roomId: router.query.id,
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
        })
      );
    }
  };

  const createCheckout = () => {
    const amount = pricePerNight * daysOfStay;
    dispatch(
      getCheckout({
        id: router.query.id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amount,
      })
    );
  };

  const bookRoom = async () => {
    try {
      setPaymentLoading(true);
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
      setPaymentLoading(false);
    } catch (error) {
      toast.error(error);
      setPaymentLoading(false);
      console.log(error);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setCheckInDate(null);
    setCheckOutDate(null);
    dispatch(clearBookingSlot());
    dispatch(clearCheckOut());
  };
  return (
    <div className={styles.paymentBox}>
      <div className={styles.paymentBox__price}>
        <p className={styles.paymentBox__price__value}>₹{room.pricePerNight}</p>
        /<p>night</p>
        <div className={styles.paymentBox__price__date}>
          {showDateBox && (
            <DatePickerBox
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              setShowDateBox={setShowDateBox}
              excludeDates={excludeDates}
              onChange={dateChange}
              reset={handleReset}
              onConfirm={createCheckout}
            />
          )}
        </div>
      </div>
      <div className={styles.paymentBox__date}>
        <div className={styles.paymentBox__date__display}>
          <input
            readOnly
            value={checkInDate ? getFullDate(checkInDate) : ""}
            type="text"
            className={styles.paymentBox__date__display__input}
          />
          <p>-</p>
          <input
            readOnly
            value={checkOutDate ? getFullDate(checkOutDate) : ""}
            type="text"
            className={styles.paymentBox__date__display__input}
          />
        </div>
        <div
          className={styles.paymentBox__date__calender}
          onClick={() => {
            setShowDateBox(true);
          }}
        >
          <p className={styles.paymentBox__date__calender__title}>
            Select Date
          </p>
          <DateRangeIcon />
        </div>
        <div className={styles.paymentBox__date__button}>
          <ConfirmButton
            text="Set Date"
            onClick={() => {
              setShowDateBox(true);
            }}
          />
          <ConfirmButton text="Reset" onClick={handleReset} />
        </div>
      </div>
      <button
        className={styles.paymentBox__book}
        onClick={bookRoom}
        style={{ backgroundColor: status !== "success" && "gray" }}
        disabled={status === "success" ? false : true}
      >
        {status === "loading"
          ? "Checking...."
          : paymentLoading
          ? "Loading...."
          : status === "success"
          ? `Book Now (₹${pricePerNight * daysOfStay})`
          : `Book Now (₹0)`}
      </button>
    </div>
  );
};

export default PaymentBox;
