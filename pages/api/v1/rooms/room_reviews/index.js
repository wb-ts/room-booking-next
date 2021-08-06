import { db } from "@config/configIndex";
import { createRoomReview } from "@controllers/room.controllers";
import onError from "@middlewares/errors";
import { isAuthenticated } from "@middlewares/middlewaresIndex";
import nc from "next-connect";

const handler = nc({ onError });
db();

handler.use(isAuthenticated).put(createRoomReview);

export default handler;
