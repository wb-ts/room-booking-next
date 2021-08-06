import { SubmitButton } from "@components/componentsIndex";
import { Loader, Button, RoomImageCarousel } from "@components/componentsIndex";
import { getDate, getInvoice } from "@helpers/helpersIndex";
import {
  bookingInfoSelector,
  clearBookingInfo,
} from "@redux/reducers/booking/bookingInfoSlice";
import { getUser } from "@redux/reducers/user/loadUserSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BookingDetailOption from "../BookingDetailOption/BookingDetailOption";
import styles from "./BookingDetails.module.scss";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const { bookingInfo, error, status } = useSelector(bookingInfoSelector());
  const { user } = useSelector(getUser());
  const {
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    _id: bookingId,
  } = bookingInfo;
  const { name, email } = bookingInfo.user;
  const { images, name: roomName, _id, pricePerNight } = bookingInfo.room;
  const { status: paymentStatus, id: payId } = bookingInfo.paymentInfo;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearBookingInfo());
    }
  }, [dispatch, error]);

  return (
    <div className={styles.bookingDetails}>
      {status === "loading" && <Loader />}
      <div className={styles.bookingDetails__back}>
        <Button text="<Back" page="me/bookings" />
      </div>
      {bookingInfo && (
        <div className={styles.bookingDetails__container}>
          <div className={styles.bookingDetails__container__images}>
            <RoomImageCarousel images={bookingInfo.room.images} />
          </div>
          <div className={styles.bookingDetails__container__booking}>
            <div className={styles.bookingDetails__container__booking__id}>
              <h3>Booking Id:</h3>
              <p>{bookingInfo._id}</p>
            </div>
            <div className={styles.bookingDetails__container__booking__invoice}>
              <SubmitButton
                text="Download Invoice"
                onClick={() =>
                  getInvoice({
                    checkInDate,
                    checkOutDate,
                    daysOfStay,
                    pricePerNight,
                    bookingId,
                    name,
                    email,
                    roomName,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.bookingDetails__container__data}>
            <BookingDetailOption
              title="User"
              data={{
                Name: name,
                Email: email,
              }}
            />
            <BookingDetailOption
              title="Booking"
              data={{
                [`Check In`]: getDate(checkInDate),
                [`Check Out`]: getDate(checkOutDate),
                Stay: `${daysOfStay} Days`,
              }}
            />
            {user?.role.toLowerCase() === "admin" ? (
              <BookingDetailOption
                title="Payment"
                data={{
                  Status: paymentStatus,
                  "Payment ID": payId,
                  Amount: `₹${amountPaid}`,
                }}
              />
            ) : (
              <BookingDetailOption
                title="Payment"
                data={{
                  Status: paymentStatus,
                  Amount: `₹${amountPaid}`,
                }}
              />
            )}
          </div>
          <div className={styles.bookingDetails__container__room}>
            <h3>Room</h3>
            <div className={styles.bookingDetails__container__room__data}>
              <Image
                src={images[0].url}
                layout="fixed"
                width={50}
                height={50}
                alt={images[0].public_id}
              />
              <div
                className={styles.bookingDetails__container__room__data__value}
              >
                <Link passHref href={`/room/${_id}`}>
                  <h5
                    className={
                      styles.bookingDetails__container__room__data__value__name
                    }
                  >
                    {roomName}
                  </h5>
                </Link>
                <h5>₹{pricePerNight} / night</h5>
                <h5>{daysOfStay} day(s)</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
