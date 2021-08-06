import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { deleteBooking } from "@controllers/admin.controller";
import { isAuthenticated, authorizeRoles } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();
handler.use(isAuthenticated, authorizeRoles("admin")).delete(deleteBooking);
export default handler;
