import { combineReducers } from "@reduxjs/toolkit";
import allRooms from "@redux/reducers/room/allRoomsSlice";
import room from "@redux/reducers/room/roomSlice";
import registerUser from "@redux/reducers/user/registerSlice";
import userProfile from "@redux/reducers/user/profileSlice";
import user from "@redux/reducers/user/loadUserSlice";
import password from "@redux/reducers/user/passwordSlice";
import booking from "@redux/reducers/booking/bookingSlice";
import bookingSlot from "@redux/reducers/booking/bookingSlotSlice";
import bookedDates from "@redux/reducers/booking/bookedDatesSlice";
import myBooking from "@redux/reducers/booking/myBookingSlice";
import bookingInfo from "@redux/reducers/booking/bookingInfoSlice";

// payment
import checkout from "@redux/reducers/payment/checkOutSlice";

//roomReview
import createRoomReview from "@redux/reducers/roomReviews/createRoomReviewSlice";
import roomReviewEligibility from "@redux/reducers/roomReviews/roomReviewEligibilitySlice";

//admin
import adminRooms from "@redux/reducers/admin/adminRoomsSlice";
import adminRoom from "@redux/reducers/admin/adminRoomSlice";
import allBookings from "@redux/reducers/admin/allBookingsSlice";
import adminBooking from "@redux/reducers/admin/adminBookingSlice";
import allUsers from "@redux/reducers/admin/allUsersSlice";
import singleUser from "@redux/reducers/admin/singleUserSlice";
import adminUser from "@redux/reducers/admin/adminUserSlice";
import roomReviews from "@redux/reducers/admin/roomReviewsSlice";
import adminReview from "@redux/reducers/admin/adminReviewSlice";

const rootReducer = combineReducers({
  adminBooking,
  adminRoom,
  adminRooms,
  adminReview,
  adminUser,
  allBookings,
  allRooms,
  allUsers,
  bookedDates,
  booking,
  bookingInfo,
  bookingSlot,
  checkout,
  createRoomReview,
  myBooking,
  password,
  registerUser,
  roomReviews,
  roomReviewEligibility,
  room,
  singleUser,
  user,
  userProfile,
});

export default rootReducer;
