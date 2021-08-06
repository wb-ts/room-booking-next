import { SubmitButton, FormInput, Loader } from "@components/componentsIndex";
import {
  clearAdminBooking,
  selectAdminBooking,
} from "@redux/reducers/admin/adminBookingSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AllBookinksTableOptions from "../AllBookinksTableOptions/AllBookinksTableOptions";
import styles from "./AllBookingsTable.module.scss";

const AllBookingsTable = ({ bookings }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filter, setFilter] = useState([]);

  const { success, status, error } = useSelector(selectAdminBooking());

  useEffect(() => {
    if (search === "") setShowFilteredData(false);

    if (error) {
      toast.error(error);
      dispatch(clearAdminBooking());
    }

    if (success) {
      toast.success("Booking Deleted Succesfully.");
      dispatch(clearAdminBooking());
      router.push("/admin/bookings");
    }
  }, [dispatch, search, error, success, router]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return toast.warn("Enter Search Id");

    const result = await bookings.filter(
      (booking) => booking.room._id === search
    );
    if (!result) return toast.error("No booking data available");
    setFilter(result);
    setShowFilteredData(true);
  };

  return (
    <div className={styles.allBookingsTable}>
      {status === "loading" && <Loader />}
      <div className={styles.allBookingsTable__top}>
        <form
          className={styles.allBookingsTable__top__search}
          onSubmit={handleSearch}
        >
          <FormInput
            type="text"
            name="roomId"
            value={search}
            setValue={setSearch}
            placeholder="Enter room id"
          />
          <SubmitButton text="Search" off={search === ""} />
        </form>
      </div>
      <div className={styles.allBookingsTable__mid}>
        <div className={styles.allBookingsTable__mid__heading}>
          <AllBookinksTableOptions
            key="headingcontent"
            booking={{
              room: "Room",
              amountPaid: "Paid",
              checkInDate: "Checkin",
              checkOutDate: "Checkout",
            }}
            heading
            last={
              filter.length === 0 && showFilteredData === true ? true : false
            }
          />
        </div>
        {showFilteredData
          ? filter.map((booking, i) => (
              <AllBookinksTableOptions
                key={booking._id + 1}
                booking={filter[filter.length - 1 - i]}
                last={filter.length - 1 === i ? true : false}
              />
            ))
          : bookings.map((booking, i) => (
              <AllBookinksTableOptions
                key={booking._id}
                booking={bookings[bookings.length - 1 - i]}
                last={bookings.length - 1 === i ? true : false}
              />
            ))}
      </div>
      <div className={styles.allBookingsTable__bottom}></div>
    </div>
  );
};

export default AllBookingsTable;
