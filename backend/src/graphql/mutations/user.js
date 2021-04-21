import { UserTC } from "../../models"
import { authMiddleware } from "../middleware";

export const createUser = UserTC.getResolver("createOne");
export const updateUserById = UserTC.getResolver("updateById", [authMiddleware(false)])