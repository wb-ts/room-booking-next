import { Ratings } from "@components/componentsIndex";
import styles from "./RoomReviews.module.scss";

const RoomReviews = ({ comment, name, rating, user }) => {
  return (
    <div className={styles.roomReviews}>
      <Ratings ratings={rating} />
      <h5 className={styles.roomReviews__name}>by {name}</h5>
      <p className={styles.roomReviews__comment}>``{comment}``</p>
    </div>
  );
};

export default RoomReviews;
