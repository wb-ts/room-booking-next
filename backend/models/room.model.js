const mongoose = require("mongoose");
// import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter room name."],
    trim: true,
    maxLength: [150, "Room name cannot exceed 100 characters."],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please Enter room charge per night."],
    default: 0.0,
  },

  discount: { type: Number, default: 0.0 },

  description: {
    type: String,
    required: [true, "Please Enter room description."],
  },
  street: {
    type: String,
    required: [true, "Please Enter room address."],
  },

  city: { type: String, required: [true, "Please Enter room city."] },
  state: { type: String, required: [true, "Please Enter room state."] },
  country: { type: String, required: [true, "Please Enter room country."] },
  pincode: { type: Number, required: [true, "Please pincode."] },

  capacity: {
    type: Number,
    required: [true, "Please Enter room capacity."],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please Enter number of beds available in room."],
  },
  facilities: {
    internet: { type: Boolean, default: false },
    breakfast: { type: Boolean, default: false },
    airConditioned: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    roomCleaning: { type: Boolean, default: false },
  },

  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: { type: Number, default: 0 },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],

  category: {
    type: String,
    required: [true, "Please select provide room category"],
    enum: {
      values: [
        "Apartments",
        "Adjacent",
        "Adjoining",
        "Cabana",
        "Connecting",
        "Disabled",
        "Double",
        "Double-Double",
        "Executive Floor",
        "Executive Suite",
        "Hollywood Twin Bed",
        "Junior Suite",
        "King",
        "Murphy",
        "Non-Smoking",
        "Presidential Suite",
        "Single",
        "Smoking",
        "Studio",
        "Triple",
        "Twins",
        "Villa",
        "Quad",
      ],
      message: "Please select correct category for room.",
    },
  },

  reviews: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);
