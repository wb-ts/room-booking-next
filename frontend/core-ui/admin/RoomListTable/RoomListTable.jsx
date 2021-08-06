import { Loader } from "@components/componentsIndex";
import { SubmitButton, FormInput } from "@components/componentsIndex";
import {
  clearAdminRoom,
  selectAdminRoom,
} from "@redux/reducers/admin/adminRoomSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import RoomListTableOptions from "../RoomListTableOptions/RoomListTableOptions";
import styles from "./RoomListTable.module.scss";

const RoomListTable = ({ rooms }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [filter, setFilter] = useState([]);

  const { success, error, status } = useSelector(selectAdminRoom());

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAdminRoom());
    }
    if (success) {
      toast.success("Room Deleted Successfully..");
      dispatch(clearAdminRoom());
      router.push("/admin/rooms");
    }
    if (search === "") setShowFilteredData(false);
  }, [dispatch, error, success, router, search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return toast.warn("Enter Search Id");

    const result = await rooms.filter((room) => room._id === search);
    if (!result) return toast.error("No room data available");
    setFilter(result);
    setShowFilteredData(true);
  };

  return (
    <div className={styles.roomListTable}>
      {status === "loading" && <Loader />}
      <div className={styles.roomListTable__top}>
        <form
          className={styles.roomListTable__top__search}
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
      <div className={styles.roomListTable__mid}>
        <div className={styles.roomListTable__mid__heading}>
          <RoomListTableOptions
            key="headingcontent"
            room={{
              Id: "Room ID",
              name: "Name",
              price: "Price/Night",
            }}
            heading
            last={
              filter.length === 0 && showFilteredData === true ? true : false
            }
          />
        </div>
        {showFilteredData
          ? filter.map((room, i) => (
              <RoomListTableOptions
                key={room._id + 1}
                room={{
                  Id: room._id,
                  name: room.name,
                  price: room.pricePerNight,
                }}
                last={filter.length - 1 === i ? true : false}
              />
            ))
          : rooms?.map((room, i) => (
              <RoomListTableOptions
                key={room._id}
                room={{
                  Id: room._id,
                  name: room.name,
                  price: room.pricePerNight,
                }}
                last={rooms.length - 1 === i ? true : false}
              />
            ))}
      </div>
      <div className={styles.roomListTable__bottom}></div>
    </div>
  );
};

export default RoomListTable;
