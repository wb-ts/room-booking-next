import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { getBookingInfo } from "@controllers/booking.controllers";
import { isAuthenticated } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();
handler.use(isAuthenticated).get(getBookingInfo);
export default handler;
