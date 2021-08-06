import { EditIcon, DeleteIcon } from "@icons/iconsIndex";
import { deleteRoom } from "@redux/reducers/admin/adminRoomSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./RoomListTableOptions.module.scss";

const RoomListTableOptions = ({ room, heading, last }) => {
  const dispatch = useDispatch();
  const { name, price, Id } = room;

  const roomDelete = (e) => {
    e.preventDefault();
    dispatch(deleteRoom(Id));
  };

  return (
    <div
      className={
        heading
          ? `${styles.roomListTableOptions} ${styles.roomListTableOptions__heading}`
          : `${styles.roomListTableOptions}`
      }
      style={{
        borderBottom: last && "1px solid black",
        backgroundColor: heading && "rgb(235, 235, 235)",
      }}
    >
      <div className={styles.roomListTableOptions__sections}>
        <p className={styles.roomListTableOptions__sections__id}>{Id}</p>
      </div>
      <div className={styles.roomListTableOptions__sections}>
        {heading ? (
          <p
            className={styles.roomListTableOptions__sections__name}
            style={{ color: "black" }}
          >
            {name}
          </p>
        ) : (
          <Link passHref href={`/room/${Id}`}>
            <p
              className={styles.roomListTableOptions__sections__name}
              style={{ color: "#259a7a", cursor: "pointer" }}
            >
              {name}
            </p>
          </Link>
        )}
      </div>
      <div className={styles.roomListTableOptions__sections}>
        <p
          className={styles.roomListTableOptions__sections__price}
          style={{ textAlign: !heading && "center" }}
        >
          {heading ? `${price} (₹)` : price}
        </p>
      </div>

      <div
        className={`${styles.roomListTableOptions__sections} ${styles.roomListTableOptions__sections__button}`}
      >
        {heading ? (
          <p className={styles.roomListTableOptions__sections__actions}>
            Actions
          </p>
        ) : (
          <div className={styles.roomListTableOptions__sections__actions}>
            <Link passHref href={`/admin/rooms/${Id}`}>
              <p
                className={`${styles.roomListTableOptions__sections__actions__button} ${styles.roomListTableOptions__sections__actions__button__view}`}
              >
                <EditIcon />
              </p>
            </Link>

            <p
              onClick={roomDelete}
              className={`${styles.roomListTableOptions__sections__actions__button} ${styles.roomListTableOptions__sections__actions__button__delete}`}
            >
              <DeleteIcon />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomListTableOptions;
