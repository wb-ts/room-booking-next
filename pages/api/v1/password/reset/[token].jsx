import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { resetPassword } from "@controllers/user.controller";

const handler = nc({ onError });
db();
handler.put(resetPassword);
export default handler;
