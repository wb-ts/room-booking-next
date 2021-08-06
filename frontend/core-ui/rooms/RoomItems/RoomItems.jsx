import { RoomCard } from "@core-ui/core-uiIndex";
import styles from "./RoomItems.module.scss";

const RoomItems = ({ rooms }) => {
  return (
    <div className={styles.roomItems}>
      <div className={styles.roomItems__items}>
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomItems;
