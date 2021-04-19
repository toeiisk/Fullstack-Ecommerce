import { OrderTC } from "../../models"
import { authMiddleware } from "../middleware";

export const createOrder = OrderTC.getResolver("createOne", [authMiddleware(false)]);
export const updateOrderById = OrderTC.getResolver("updateById", [authMiddleware(false)])