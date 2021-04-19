import { CartTC } from "../../models"
import { authMiddleware } from "../middleware"

export const createCart = CartTC.getResolver("createOne", [authMiddleware(false)]);