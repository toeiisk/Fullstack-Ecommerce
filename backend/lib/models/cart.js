"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CartTC = exports.CartModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const PruductItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
    index: true,
    ref: 'Product'
  },
  amount: {
    type: Number,
    required: true,
    default: 1
  }
});
const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    ref: 'User'
  },
  productItem: [PruductItemSchema]
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

const CartModel = _mongoose.default.model("Cart", CartSchema);

exports.CartModel = CartModel;
const CartTC = (0, _graphqlComposeMongoose.composeWithMongoose)(CartModel, {
  removeFields: ["createdAt", "updatedAt"]
});
exports.CartTC = CartTC;
var _default = CartModel;
exports.default = _default;