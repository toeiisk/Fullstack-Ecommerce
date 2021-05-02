"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OrderTC = exports.OrderModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

var _graphqlCompose = require("graphql-compose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const ProductPromotionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});
const ProductItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
    index: true,
    ref: "Product"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  discountedPercent: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  activePromotions: [ProductPromotionSchema]
});
const enumOrderType = {
  WAIT: "Waiting",
  COMPLETE: "Complete",
  CANCEL: "Cancel"
};
const OrderSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
    ref: "User"
  },
  productItem: [ProductItemSchema],
  paymentMethod: {
    type: String
  },
  status: {
    type: String,
    default: "WAIT",
    enum: Object.keys(enumOrderType),
    index: true
  }
}, {
  timestamps: {
    createdAt: "purchaseDate"
  }
});

const OrderModel = _mongoose.default.model("Order", OrderSchema);

exports.OrderModel = OrderModel;
const OrderTC = (0, _graphqlComposeMongoose.composeWithMongoose)(OrderModel, {
  removeFields: ["purchaseDate", "updatedAt"]
});
exports.OrderTC = OrderTC;
var _default = OrderModel;
exports.default = _default;