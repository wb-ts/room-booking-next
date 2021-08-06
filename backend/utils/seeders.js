// const db = require("../config/db");
const mongoose = require("mongoose");
const Room = require("../models/room.model");
const room = require("../data/rooms");

mongoose.connect("mongodb://localhost:27017/mybnb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");
    await Room.insertMany(room);
    console.log("Added all rooms");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
