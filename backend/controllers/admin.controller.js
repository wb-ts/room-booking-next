import { cloudinaryConfig } from "@config/configIndex";
import cloudinary from "cloudinary";
import { catchAsyncErrors } from "@middlewares/middlewaresIndex";
import { Booking, Room, User } from "@models/modelsIndex";
import { ErrorHandler } from "@utils/utilsIndex";

cloudinaryConfig();

//Get All rooms - Admin => /api/v1/admin/rooms
export const allAdminRooms = catchAsyncErrors(async (req, res, next) => {
  const rooms = await Room.find();
  if (!rooms) return next(new ErrorHandler("Rooms not found.", 404));
  res.status(200).json({
    success: true,
    rooms,
  });
});

//Get All Bookings - Admin => /api/v1/admin/bookings
export const allBookings = catchAsyncErrors(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate({
      path: "room",
      select: "name pricePerNight images",
    })
    .populate({ path: "user", select: "name email" });

  if (!bookings) return next(new ErrorHandler("No Booking Data found.", 404));

  res.status(200).json({
    success: true,
    bookings,
  });
});

//Get All Bookings - Admin => /api/v1/admin/bookings/:id
export const deleteBooking = catchAsyncErrors(async (req, res, next) => {
  const booking = await Booking.findById(req.query.id);

  if (!booking) return next(new ErrorHandler("No Booking Data found.", 404));
  await booking.remove();
  res.status(200).json({
    success: true,
  });
});

//Get All Users - Admin => /api/v1/admin/users
export const getUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  if (!users) return next(new ErrorHandler("No Booking Data found.", 404));

  res.status(200).json({
    success: true,
    users,
  });
});

//Get Single Users - Admin => /api/v1/admin/users/:id
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.query.id);

  if (!user) return next(new ErrorHandler("No User found.", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User - Admin => /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, role } = req.body;
  const userData = { name, email, role };
  const user = await User.findByIdAndUpdate(req.query.id, userData, {
    new: true,
    runValidators: false,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete User  => /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.query.id);
  if (!user) return next(new ErrorHandler("No User found.", 404));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  await user.remove();
  res.status(200).json({
    success: true,
  });
});

//Get All Reviews - Admin => /api/v1/admin/reviews
export const getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) return next(new ErrorHandler("No Review Data found.", 404));

  res.status(200).json({
    success: true,
    reviews: room?.reviews,
  });
});

//Delete Review - Admin => /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.roomId);

  const reviews = room.reviews.filter(
    ({ _id }) => _id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;
  const ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

  await Room.findByIdAndUpdate(
    req.query.roomId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({ success: true });
});
