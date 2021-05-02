"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PromotionTC = exports.PromotionModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const PromotionSchema = new Schema({
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
  productId: {
    type: String,
    required: true,
    index: true,
    ref: 'Product'
  },
  startDate: {
    type: Date,
    default: Date.now(),
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

const PromotionModel = _mongoose.default.model("Promotion", PromotionSchema);

exports.PromotionModel = PromotionModel;
const PromotionTC = (0, _graphqlComposeMongoose.composeWithMongoose)(PromotionModel, {
  removeFields: ["createdAt", "updatedAt"]
});
exports.PromotionTC = PromotionTC;
var _default = PromotionModel;
exports.default = _default;