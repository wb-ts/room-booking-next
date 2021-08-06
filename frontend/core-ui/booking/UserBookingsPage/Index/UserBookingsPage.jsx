import {
  clearMyBooking,
  myBookingSelector,
} from "@redux/reducers/booking/myBookingSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserBookingsTable from "../UserBookingsTable/UserBookingsTable";
import styles from "./UserBookingsPage.module.scss";

const UserBooking = () => {
  const dispatch = useDispatch();
  const { bookings, error } = useSelector(myBookingSelector());

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMyBooking());
    }
  }, [dispatch, error]);
  return (
    <div className={styles.userBooking}>
      <h1 className={styles.userBooking__heading}>My Bookings</h1>
      <UserBookingsTable bookings={bookings} />
    </div>
  );
};

export default UserBooking;
