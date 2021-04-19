import { UserInputError } from 'apollo-server-express'
import { schemaComposer } from 'graphql-compose'
import jsonwebtoken from 'jsonwebtoken'
import { UserModel, UserTC } from '../../models'

const LoginPayload = schemaComposer.createObjectTC({
    name: 'LoginPayload',
    fields: {
        token: 'String',
        user: UserTC.getType()
    }
})

export const userLogin = schemaComposer.createResolver({
    name: "userLogin",
    args: {
        username: 'String!',
        password: 'String!'
    },
    type: LoginPayload,
    resolve: async ({ args }) => {
        const { username, password } = args
        const user = await UserModel.findOne({ username })
        if (!user) {
            throw new UserInputError("Username not found")
        }
        const isValid = await user.verifyPassword(password)
        if (!isValid) {
            throw new UserInputError("Incorrect password")
        }
        return {
            token: jsonwebtoken.sign({ _id: user._id }, process.env.SECRET_KEY ?? 'default-secret', { expiresIn: '1d', algorithm: 'HS256' }),
            user
        }
    }
})