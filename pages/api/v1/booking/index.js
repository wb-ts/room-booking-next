import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { isAuthenticated } from "@middlewares/middlewaresIndex";
import { newBooking } from "@controllers/booking.controllers";

const handler = nc({ onError });
db();

handler.use(isAuthenticated).post(newBooking);
export default handler;
