import { db } from "@config/configIndex";
import { allAdminRooms } from "@controllers/admin.controller";
import onError from "@middlewares/errors";
import nc from "next-connect";
import { isAuthenticated, authorizeRoles } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();
handler.use(isAuthenticated, authorizeRoles("admin")).get(allAdminRooms);

export default handler;
