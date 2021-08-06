import nc from "next-connect";
import onError from "@middlewares/errors";
import { db } from "@config/configIndex";
import { isAuthenticated, authorizeRoles } from "@middlewares/middlewaresIndex";
import { allBookings } from "@controllers/admin.controller";

const handler = nc({ onError });
db();

handler.use(isAuthenticated, authorizeRoles("admin")).get(allBookings);
export default handler;
