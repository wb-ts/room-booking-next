import {
  clearAllBookings,
  selectAllBookings,
} from "@redux/reducers/admin/allBookingsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AllBookingsTable from "../AllBookingsTable/AllBookingsTable";
import styles from "./AllBookingsPage.module.scss";
const AllBookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings, error } = useSelector(selectAllBookings());

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllBookings());
    }
  }, [dispatch, error]);
  return (
    <div className={styles.allBookingsPage}>
      <h1 className={styles.allBookingsPage__heading}>All Bookings</h1>
      <AllBookingsTable bookings={bookings} />
    </div>
  );
};

export default AllBookingsPage;
