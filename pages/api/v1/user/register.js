import { db } from "@config/configIndex";
import { registerUser } from "@controllers/user.controller";
import onError from "@middlewares/errors";
import nc from "next-connect";

const handler = nc({ onError });

db();

handler.post(registerUser);

export default handler;
