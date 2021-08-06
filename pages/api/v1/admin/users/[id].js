import { db } from "@config/configIndex";
import {
  getSingleUser,
  updateUser,
  deleteUser,
} from "@controllers/admin.controller";
import onError from "@middlewares/errors";
import nc from "next-connect";
import { isAuthenticated, authorizeRoles } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();
handler.use(isAuthenticated, authorizeRoles("admin")).get(getSingleUser);
handler.use(isAuthenticated, authorizeRoles("admin")).put(updateUser);
handler.use(isAuthenticated, authorizeRoles("admin")).delete(deleteUser);

export default handler;
