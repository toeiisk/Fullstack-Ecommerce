import { AuthenticationError } from "apollo-server-errors"
import { UserModel } from "../../models"

export const authMiddleware = (isStaff) => async (resolve, source, args, context, info) => {
    if (context.user) {
        const user = await UserModel.findById(context.user._id)
        if ((isStaff && user.isStaff) || (!isStaff && user)) {
            return resolve(source, args, context, info)
        } else {
            throw new AuthenticationError("You don't have permission")
        }
    }
    throw new AuthenticationError("You must be authorized")
}