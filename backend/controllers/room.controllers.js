import { cloudinaryConfig } from "@config/configIndex";
import cloudinary from "cloudinary";
import catchAsyncErrors from "@middlewares/catchAsyncErrors";
import { Room, Booking } from "@models/modelsIndex";
import { APIFeatures, ErrorHandler } from "@utils/utilsIndex";

cloudinaryConfig();

//Get All rooms => /api/v1/rooms
export const getAllRooms = catchAsyncErrors(async (req, res) => {
  const resPerPage = 6;
  const roomsCount = await Room.countDocuments();
  const apiFeatures = new APIFeatures(Room, req.query).search().filter();
  let rooms = await apiFeatures.query;
  let filteredRoomsCounts = rooms.length;
  rooms = await apiFeatures.pagination(resPerPage).query;

  res.status(200).json({
    success: true,
    roomsCount,
    resPerPage,
    filteredRoomsCounts,
    rooms,
  });
});

//Create room => /api/v1/rooms
export const newRoom = catchAsyncErrors(async (req, res) => {
  const images = req.body.images;
  let imageLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "mybnb/rooms",
    });

    imageLinks.push({ public_id: result.public_id, url: result.secure_url });
  }

  req.body.images = imageLinks;
  req.body.user = req.user._id;

  const room = await Room.create(req.body);
  res.status(200).json({ success: true });
});

//Find room by id => /api/v1/rooms/:id

export const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) return next(new ErrorHandler("Room not found.", 404));

  res.status(200).json({ success: true, room });
});

//Update room details => /api/v1/rooms/:id

export const updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.query.id);

  if (!room) return next(new ErrorHandler("Room not found.", 404));

  if (req.body.images) {
    let imageLinks = [];

    for (let i = 0; i < room.images.length; i++) {
      await cloudinary.v2.uploader.destroy(room.images[i].public_id);
    }

    for (let i = 0; i < req.body.images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
        folder: "mybnb/rooms",
      });

      imageLinks.push({ public_id: result.public_id, url: result.secure_url });
    }
    req.body.images = imageLinks;
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

//Delete room => /api/v1/rooms/:id

export const deleteRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) return next(new ErrorHandler("Room not found.", 404));

  for (let i = 0; i < room.images.length; i++) {
    await cloudinary.v2.uploader.destroy(room.images[i].public_id);
  }

  await room.remove();
  res.status(200).json({ success: true });
});

//Room reviews => /api/v1/rooms/room_reviews

export const createRoomReview = catchAsyncErrors(async (req, res) => {
  const { rating, comment, roomId } = req.body;
  const { name, _id } = req.user;

  const room = await Room.findById(roomId);
  // let { reviews, numOfReviews, ratings } = room;
  const isReviewed = room.reviews.find(
    (r) => r.user.toString() === _id.toString()
  );

  if (isReviewed)
    room.reviews.forEach((review) => {
      if (review.user.toString() === _id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  else {
    room.reviews.push({ user: _id, name, rating: Number(rating), comment });
  }
  room.numOfReviews = room.reviews.length;

  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

//Check review eligibility => api/v1/rooms/room_reviews/check_review_eligibility

export const checkReviewEligiblity = catchAsyncErrors(async (req, res) => {
  const { roomId } = req.query;

  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  let isEligible = false;

  if (bookings?.length > 0) isEligible = true;

  res.status(200).json({ success: true, isEligible });
});
