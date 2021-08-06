import { DeleteIcon } from "@icons/iconsIndex";
import { deleteReview } from "@redux/reducers/admin/adminReviewSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./AllReviewsOptions.module.scss";

const AllReviewsOptions = ({ review, roomId, heading, last }) => {
  const dispatch = useDispatch();
  const { name, rating, comment, id } = review;

  const reviewDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview({ id, roomId }));
  };
  return (
    <div
      className={
        heading
          ? `${styles.allReviewsOptions} ${styles.allReviewsOptions__heading}`
          : `${styles.allReviewsOptions}`
      }
      style={{
        borderBottom: last && "1px solid black",
        backgroundColor: heading && "rgb(235, 235, 235)",
      }}
    >
      <div className={styles.allReviewsOptions__sections}>
        <p className={styles.allReviewsOptions__sections__id}>{id}</p>
      </div>
      <div className={styles.allReviewsOptions__sections}>
        {heading ? (
          <p
            className={styles.allReviewsOptions__sections__name}
            style={{ color: "black" }}
          >
            {name}
          </p>
        ) : (
          <p className={styles.allReviewsOptions__sections__name}>{name}</p>
        )}
      </div>
      <div className={styles.allReviewsOptions__sections}>
        <p className={styles.allReviewsOptions__sections__rating}>{rating}</p>
      </div>
      <div className={styles.allReviewsOptions__sections}>
        <p className={styles.allReviewsOptions__sections__comment}>{comment}</p>
      </div>

      <div
        className={`${styles.allReviewsOptions__sections} ${styles.allReviewsOptions__sections__button}`}
      >
        {heading ? (
          <p className={styles.allReviewsOptions__sections__actions}>Delete</p>
        ) : (
          <div className={styles.allReviewsOptions__sections__actions}>
            <p
              onClick={reviewDelete}
              className={`${styles.allReviewsOptions__sections__actions__button} ${styles.allReviewsOptions__sections__actions__button__delete}`}
            >
              <DeleteIcon />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviewsOptions;
