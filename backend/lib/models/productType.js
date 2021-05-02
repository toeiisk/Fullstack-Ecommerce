"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProductTypeTC = exports.ProductTypeModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _graphqlComposeMongoose = require("graphql-compose-mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const ProductTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

const ProductTypeModel = _mongoose.default.model("ProductType", ProductTypeSchema);

exports.ProductTypeModel = ProductTypeModel;
const ProductTypeTC = (0, _graphqlComposeMongoose.composeWithMongoose)(ProductTypeModel, {
  removeFields: ["createdAt", "updatedAt"]
});
exports.ProductTypeTC = ProductTypeTC;
var _default = ProductTypeModel;
exports.default = _default;