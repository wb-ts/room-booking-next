import { db } from "@config/configIndex";
import { checkReviewEligiblity } from "@controllers/room.controllers";
import onError from "@middlewares/errors";
import { isAuthenticated } from "@middlewares/middlewaresIndex";
import nc from "next-connect";

const handler = nc({ onError });
db();

handler.use(isAuthenticated).get(checkReviewEligiblity);

export default handler;
