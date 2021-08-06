import {
  MetaData,
  RoomImageCarousel,
  SubmitButton,
  Loader,
} from "@components/componentsIndex";
import { roomSelector, clearRoomError } from "@redux/reducers/room/roomSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  BookmarkBorderIcon,
  ShareOutlinedIcon,
  RoomOutlinedIcon,
} from "@icons/iconsIndex";
import { clearBookingSlot } from "@redux/reducers/booking/bookingSlotSlice";
import styles from "./RoomDetails.module.scss";
import { Facilities, RoomReviews } from "@core-ui/core-uiIndex";
import { useDispatch } from "react-redux";
import PaymentBox from "./PaymentBox/PaymentBox";
import NewRoomReview from "../NewRoomReview/NewRoomReview";
import { Ratings } from "@components/componentsIndex";
import { useRouter } from "next/dist/client/router";
import {
  checkRoomReviewEligibility,
  selectRoomReviewEligibility,
} from "@redux/reducers/roomReviews/roomReviewEligibilitySlice";

const RoomDetails = () => {
  const router = useRouter();
  const { id } = router?.query;
  const dispatch = useDispatch();
  const [showReviewBox, setShowReviewBox] = useState(false);

  const { room, status, error } = useSelector(roomSelector());
  const { isEligible } = useSelector(selectRoomReviewEligibility());

  useEffect(() => {
    if (id) dispatch(checkRoomReviewEligibility({ roomId: id }));
    if (error) {
      toast.error(error);
      dispatch(clearRoomError());
    }

    return () => {
      dispatch(clearBookingSlot());
    };
  }, [error, dispatch, id]);

  return (
    <div className={styles.roomDetails}>
      <MetaData title={room?.name} description={room?.description} />
      {status === "loading" && <Loader />}
      {room && (
        <>
          <div className={styles.roomDetails__images}>
            <RoomImageCarousel images={room.images} />
          </div>

          <div className={styles.roomDetails__response}>
            <div className={styles.roomDetails__response__rating}>
              <p className={styles.roomDetails__response__rating__value}>
                {room?.ratings || 0}
              </p>
              {
                <div>
                  <Ratings ratings={room?.ratings || 0} />
                </div>
              }
              <p>({room.numOfReviews} Review(s))</p>
              {isEligible && (
                <SubmitButton
                  text="Submit Review"
                  onClick={(e) => setShowReviewBox((show) => !show)}
                />
              )}
              {showReviewBox && (
                <NewRoomReview setShowReviewBox={setShowReviewBox} />
              )}
            </div>
            <div className={styles.roomDetails__response__actions}>
              <p>
                <BookmarkBorderIcon
                  style={{ opacity: "30%", cursor: "pointer" }}
                />
              </p>
              <p>
                <ShareOutlinedIcon
                  style={{ opacity: "30%", cursor: "pointer" }}
                />
              </p>
            </div>
          </div>
          <div className={styles.roomDetails__info}>
            <div className={styles.roomDetails__info__details}>
              <h2>{room?.name}</h2>
              <h5>
                <RoomOutlinedIcon style={{ fontSize: "12px" }} />
                {`  ${room?.street}, ${room?.city}, ${room?.state}, ${room?.country}, ${room?.pincode}`}
              </h5>
              <div className={styles.roomDetails__info__details__description}>
                <h4>Description</h4>
                <p>{room.description}</p>
              </div>
            </div>
            <div className={styles.roomDetails__info__payment}>
              <PaymentBox room={room} />
            </div>
          </div>

          <div className={styles.roomDetails__facility}>
            <h4>Facilities</h4>
            <Facilities
              facilities={{
                ...room.facilities,
                size: room.capacity,
                type: room.category,
                beds: room.numOfBeds,
              }}
            />
          </div>
          <div className={styles.roomDetails__reviews}>
            <h4>Reviews</h4>
            <div>
              {room?.reviews.map(({ comment, name, rating, user, _id }) => (
                <RoomReviews
                  comment={comment}
                  name={name}
                  rating={rating}
                  user={user}
                  key={_id}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomDetails;
