import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { isAuthenticated } from "@middlewares/middlewaresIndex";
import { stripeCheckoutSession } from "@controllers/payment.controller";

const handler = nc({ onError });
db();
handler.use(isAuthenticated).get(stripeCheckoutSession);
export default handler;
