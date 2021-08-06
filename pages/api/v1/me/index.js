import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { currentUser } from "@controllers/user.controller";
import { isAuthenticated } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();

handler.use(isAuthenticated).get(currentUser);
export default handler;
