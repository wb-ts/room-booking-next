import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { stripeCheckoutWebhook } from "@controllers/payment.controller";

const handler = nc({ onError });
db();

export const config = {
  api: {
    bodyParser: false,
  },
};
handler.post(stripeCheckoutWebhook);
export default handler;
