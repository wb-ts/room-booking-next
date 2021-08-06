import { catchAsyncErrors } from "@middlewares/middlewaresIndex";
import { Booking } from "@models/modelsIndex";
import moment from "moment";
import { extendMoment } from "moment-range";

const moments = extendMoment(moment);

//create new booking => /api/v1/booking
export const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    amountPaid,
    daysOfStay,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    amountPaid,
    daysOfStay,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});

//check availability => /api/v1/booking/check
export const checkAvailability = catchAsyncErrors(async (req, res) => {
  let { roomId, checkInDate, checkOutDate } = req.query;
  checkInDate = new Date(checkInDate);
  checkOutDate = new Date(checkOutDate);

  const bookings = await Booking.find({
    room: roomId,
    $and: [
      { checkInDate: { $lte: checkOutDate } },
      { checkOutDate: { $gte: checkInDate } },
    ],
  });

  //check availability

  let isAvailable;

  if (bookings?.length === 0) isAvailable = true;
  else isAvailable = false;

  res.status(200).json({
    success: true,
    isAvailable,
  });
});

//Get Unavailable Dates => /api/v1/booking/booked_dates

export const getBookedDates = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ room: roomId });
  let bookedDates = [];

  //time in hours
  const timeDiff = moments().utcOffset() / 60;

  bookings.forEach((booking) => {
    const checkInDate = moments(booking.checkInDate).add(timeDiff, "hours");
    const checkOutDate = moments(booking.checkOutDate).add(timeDiff, "hours");
    const range = moments
      .range(moments(checkInDate), moments(checkOutDate))
      .by("day");
    const dates = Array.from(range);
    bookedDates = bookedDates.concat(dates);
  });

  res.status(200).json({
    success: true,
    bookedDates,
  });
});

//Get User Bookings => /api/v1/booking/my_bookings
export const myBookings = catchAsyncErrors(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({ path: "user", select: "name email" });
  res.status(200).json({
    success: true,
    bookings,
  });
});

//Get User Booking Info => /api/v1/booking/:bookingId
export const getBookingInfo = catchAsyncErrors(async (req, res) => {
  const bookingInfo = await Booking.findById(req.query.id)
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({ path: "user", select: "name email" });

  res.status(200).json({ success: true, bookingInfo });
});
