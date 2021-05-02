"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProductTC = exports.ProductModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String
  },
  productType: [{
    type: String
  }],
  slug: {
    type: String
  }
}, {
  timestamps: {
    createdAt: "createdAt"
  }
});

const ProductModel = _mongoose.default.model("Product", ProductSchema);

exports.ProductModel = ProductModel;
const ProductTC = (0, _graphqlComposeMongoose.composeWithMongoose)(ProductModel, {
  removeFields: ["createdAt", "updatedAt"]
});
exports.ProductTC = ProductTC;
var _default = ProductModel;
exports.default = _default;