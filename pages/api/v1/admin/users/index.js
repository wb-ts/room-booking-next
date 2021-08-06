import { db } from "@config/configIndex";
import { getUsers } from "@controllers/admin.controller";
import onError from "@middlewares/errors";
import nc from "next-connect";
import { isAuthenticated, authorizeRoles } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();
handler.use(isAuthenticated, authorizeRoles("admin")).get(getUsers);

export default handler;
