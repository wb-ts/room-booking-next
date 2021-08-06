import { db } from "@config/configIndex";
import { getAllReviews, deleteReview } from "@controllers/admin.controller";
import onError from "@middlewares/errors";
import nc from "next-connect";
import { isAuthenticated, authorizeRoles } from "@middlewares/middlewaresIndex";

const handler = nc({ onError });
db();

handler.use(isAuthenticated, authorizeRoles("admin")).get(getAllReviews);
handler.use(isAuthenticated, authorizeRoles("admin")).put(deleteReview);

export default handler;
