import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { isAuthenticated } from "@middlewares/middlewaresIndex";
import { updateProfile } from "@controllers/user.controller";

const handler = nc({ onError });
db();
handler.use(isAuthenticated).put(updateProfile);
export default handler;
