import { Button } from "@components/componentsIndex";
import { selectAdminRooms } from "@redux/reducers/admin/adminRoomsSlice";
import { useSelector } from "react-redux";
import RoomListTable from "../RoomListTable/RoomListTable";
import styles from "./RoomList.module.scss";

const RoomList = () => {
  const { rooms } = useSelector(selectAdminRooms());
  return (
    <div className={styles.roomList}>
      <div className={styles.roomList__top}>
        <h1 className={styles.roomList__top__heading}>All Rooms</h1>
        <Button text="New Room" page="admin/rooms/new" />
      </div>
      <RoomListTable rooms={rooms} />
    </div>
  );
};

export default RoomList;
