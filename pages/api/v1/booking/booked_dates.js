import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { getBookedDates } from "@controllers/booking.controllers";

const handler = nc({ onError });
db();
handler.get(getBookedDates);
export default handler;
