import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: { type: String, required: true, bcrypt: true },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        dropDups: true,
    },
    isStaff: { type: Boolean, default: false },
    firstname: { type: String },
    lastname: { type: String },
    address: { type: String },
    phone: { type: String },
});
UserSchema.plugin(bcrypt);

export const UserModel = mongoose.model("User", UserSchema);

export const UserTC = composeWithMongoose(UserModel).removeField("password");

export default UserModel;