import { SubmitButton, FormInput } from "@components/componentsIndex";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserBookingTableOptions from "../UserBookingTableOptions/UserBookingTableOptions";
import styles from "./UserBookingsTable.module.scss";
const UserBookingsTable = ({ bookings }) => {
  const [search, setSearch] = useState("");
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (search === "") setShowFilteredData(false);
  }, [search]);
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
    <div className={styles.userBookingsTable}>
      <div className={styles.userBookingsTable__top}>
        <form
          className={styles.userBookingsTable__top__search}
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
      <div className={styles.userBookingsTable__mid}>
        <div className={styles.userBookingsTable__mid__heading}>
          <UserBookingTableOptions
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
              <UserBookingTableOptions
                key={booking._id + 1}
                booking={filter[filter.length - 1 - i]}
                last={filter.length - 1 === i ? true : false}
              />
            ))
          : bookings.map((booking, i) => (
              <UserBookingTableOptions
                key={booking._id}
                booking={bookings[bookings.length - 1 - i]}
                last={bookings.length - 1 === i ? true : false}
              />
            ))}
      </div>
      <div className={styles.userBookingsTable__bottom}></div>
    </div>
  );
};

export default UserBookingsTable;
