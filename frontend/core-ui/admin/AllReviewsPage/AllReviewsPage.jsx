import { SubmitButton, FormInput, Loader } from "@components/componentsIndex";
import {
  clearAdminReview,
  selectAdminReview,
} from "@redux/reducers/admin/adminReviewSlice";
import {
  clearRoomReviews,
  fetchRoomReviews,
  selectRoomReviews,
} from "@redux/reducers/admin/roomReviewsSlice";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AllReviewsOptions from "../AllReviewsOptions/AllReviewsOptions";
import styles from "./AllReviewsPage.module.scss";

const AllReviewsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const { reviews, error } = useSelector(selectRoomReviews());
  const {
    success,
    error: deleteError,
    status,
  } = useSelector(selectAdminReview());
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearRoomReviews());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearAdminReview());
    }

    if (success) {
      toast.success(success);
      router.push("/admin/reviews");
      dispatch(clearAdminReview());
    }
  }, [dispatch, roomId, error, deleteError, success, router]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (roomId === "") return toast.warn("Enter room Id");
    dispatch(fetchRoomReviews(roomId));
  };

  return (
    <div className={styles.allReviewsPage}>
      {status === "loading" && <Loader />}
      <div className={styles.allReviewsPage__top}>
        <h1 className={styles.allReviewsPage__top__heading}>Room Reviews</h1>
      </div>
      <div className={styles.allReviewsPage__top__container}>
        <div className={styles.allReviewsPage__top__container__search}>
          <form
            className={styles.allReviewsPage__top__container__search__form}
            onSubmit={handleSearch}
          >
            <FormInput
              type="text"
              name="roomId"
              value={roomId}
              setValue={setRoomId}
              placeholder="Enter room id."
            />
            <SubmitButton text="Search" off={roomId === ""} />
          </form>
        </div>
        <div className={styles.allReviewsPage__top__container__mid}>
          <div className={styles.allReviewsPage__top__container__mid__heading}>
            <AllReviewsOptions
              key="headingcontent"
              review={{
                id: "ID",
                name: "Name",
                rating: "Rating",
                comment: "Comment",
                user: "User",
              }}
              heading
              last={reviews.length === 0}
            />
          </div>
          {reviews.length > 0 ? (
            reviews.map((review, i) => (
              <AllReviewsOptions
                key={review._id}
                roomId={roomId}
                review={{
                  id: review._id,
                  name: review.name,
                  rating: review.rating,
                  comment: review.comment,
                }}
                last={reviews.length - 1 === i ? true : false}
              />
            ))
          ) : (
            <div>
              <p>No reviews.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReviewsPage;
