import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { checkAvailability } from "@controllers/booking.controllers";

const handler = nc({ onError });
db();
handler.get(checkAvailability);
export default handler;
