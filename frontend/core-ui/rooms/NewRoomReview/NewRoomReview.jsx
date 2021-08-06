import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateReview,
  createReviewSelector,
  newReview,
} from "@redux/reducers/roomReviews/createRoomReviewSlice";
import styles from "./NewRoomReview.module.scss";
import { toast } from "react-toastify";
import { SubmitButton, Ratings } from "@components/componentsIndex";

const NewRoomReview = ({ setShowReviewBox }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = router.query;

  const { status, error } = useSelector(createReviewSelector());

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearCreateReview());
    }

    if (status === "success") {
      toast.success("Review posted.");
      dispatch(clearCreateReview());
      router.push(`/room/${id}`);
      setShowReviewBox(false);
    }
  }, [dispatch, error, status, setShowReviewBox, router, id]);

  const submitReview = (e) => {
    e.preventDefault();

    const reviewData = { rating, comment, roomId: id };
    dispatch(newReview(reviewData));
  };

  return (
    <div className={styles.newRoomReview}>
      <form onSubmit={submitReview} className={styles.newRoomReview__form}>
        <button
          onClick={(e) => setShowReviewBox(false)}
          className={styles.newRoomReview__form__cancel}
        >
          X
        </button>
        <Ratings
          rating={rating}
          setRating={setRating}
          hover={hover}
          setHover={setHover}
        />
        <h3 className={styles.newRoomReview__form__title}>Your Review</h3>
        <textarea
          className={styles.newRoomReview__form__box}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="review"
          cols="45"
          rows="10"
        />
        <SubmitButton
          text="Submit Review"
          disabled={status === "loading"}
          disabledText="Submitting...."
        />
      </form>
    </div>
  );
};

export default NewRoomReview;
