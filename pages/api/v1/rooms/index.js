import { db } from "@config/configIndex";
import { getAllRooms, newRoom } from "@controllers/room.controllers";
import onError from "@middlewares/errors";
import nc from "next-connect";
import { isAuthenticated, authorizeRoles } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();
handler.get(getAllRooms);
handler.use(isAuthenticated, authorizeRoles("admin")).post(newRoom);

export default handler;
