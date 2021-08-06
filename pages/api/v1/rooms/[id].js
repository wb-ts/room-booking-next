import { db } from "@config/configIndex";
import {
  deleteRoom,
  getSingleRoom,
  updateRoom,
} from "@controllers/room.controllers";
import onError from "@middlewares/errors";
import nc from "next-connect";
import { isAuthenticated, authorizeRoles } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();

handler.get(getSingleRoom);
handler.use(isAuthenticated, authorizeRoles("admin")).put(updateRoom);
handler.use(isAuthenticated, authorizeRoles("admin")).delete(deleteRoom);
export default handler;
