import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { forgotPassword } from "@controllers/user.controller";

const handler = nc({ onError });
db();
handler.post(forgotPassword);
export default handler;
