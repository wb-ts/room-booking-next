import { RoomItems } from "@core-ui/core-uiIndex";
import {
  clearAllRoomsError,
  selectAllRooms,
} from "@redux/reducers/room/allRoomsSlice";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./Home.module.scss";

const Home = () => {
  const { rooms, error, roomsCount } = useSelector(selectAllRooms());
  const [allRooms, setAllRooms] = useState(rooms);
  const dispatch = useDispatch();
  const router = useRouter();

  let page = 1;
  console.log(rooms);
  const pagination = async (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop === clientHeight &&
      roomsCount > allRooms.length
    ) {
      page += 1;
      const { data } = await axios.get(`/api/v1/rooms?page=${page}`);
      setAllRooms((old) => [...old, ...data.rooms]);
    }
  };

  useEffect(() => {
    // window.navigator.geolocation.getCurrentPosition(console.log, console.log);
    if (error) {
      toast.error(error?.message);
      dispatch(clearAllRoomsError());
    }
  }, [error, dispatch, rooms]);

  return (
    <div className={styles.home} onScroll={pagination}>
      {rooms?.length === 0 ? (
        <div>No Rooms Available...</div>
      ) : (
        <RoomItems rooms={allRooms} />
      )}
    </div>
  );
};

export default Home;
