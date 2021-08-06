import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { isAuthenticated } from "@middlewares/middlewaresIndex";
import { myBookings } from "@controllers/booking.controllers";

const handler = nc({ onError });
db();

handler.use(isAuthenticated).get(myBookings);
export default handler;
