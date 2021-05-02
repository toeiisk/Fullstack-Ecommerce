"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserTC = exports.UserModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseBcrypt = _interopRequireDefault(require("mongoose-bcrypt"));

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const CartItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
    index: true,
    ref: "Product"
  },
  amount: {
    type: Number,
    required: true,
    default: 1
  }
});
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    dropDups: true
  },
  isStaff: {
    type: Boolean,
    default: false
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  cartItem: [CartItemSchema]
});
UserSchema.plugin(_mongooseBcrypt.default);

const UserModel = _mongoose.default.model("User", UserSchema);

exports.UserModel = UserModel;
const UserTC = (0, _graphqlComposeMongoose.composeWithMongoose)(UserModel).removeField("password");
exports.UserTC = UserTC;
var _default = UserModel;
exports.default = _default;