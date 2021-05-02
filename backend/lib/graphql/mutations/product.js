"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductById = exports.createProduct = void 0;

var _graphqlCompose = require("graphql-compose");

var _models = require("../../models");

var _middleware = require("../middleware");

var _isEmpty = _interopRequireDefault(require("is-empty"));

var _apolloServerExpress = require("apollo-server-express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductITC = (0, _graphqlCompose.toInputObjectType)(_models.ProductTC); // export const createProduct = ProductTC.getResolver("createOne", [authMiddleware(true)]);
// export const updateProductById = ProductTC.getResolver("updateById", [
//   authMiddleware(true),
// ]);

const createProduct = _graphqlCompose.schemaComposer.createResolver({
  name: "createProduct",
  args: {
    record: ProductITC
  },
  type: _models.ProductTC.getType(),
  resolve: async ({
    args
  }) => {
    const {
      record
    } = args;
    const newProduct = new _models.ProductModel({
      name: record.name,
      description: record.description,
      price: record.price,
      amount: record.amount,
      image: record.image,
      productType: record.productType,
      slug: record.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    });
    await newProduct.save();
    return newProduct;
  }
}).withMiddlewares([(0, _middleware.authMiddleware)(true)]);

exports.createProduct = createProduct;

const updateProductById = _graphqlCompose.schemaComposer.createResolver({
  name: "updateProductById",
  args: {
    record: ProductITC,
    _id: "MongoID!"
  },
  type: _models.ProductTC.getType(),
  resolve: async ({
    args
  }) => {
    const {
      record,
      _id
    } = args;
    const product = await _models.ProductModel.findById(_id);

    if ((0, _isEmpty.default)(product)) {
      throw new _apolloServerExpress.UserInputError("Product not exist");
    }

    product.name = record.name;
    product.description = record.description;
    product.price = record.price;
    product.amount = record.amount;
    product.image = record.image;
    product.productType = record.productType;
    product.slug = record.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    await product.save();
    return product;
  }
}).withMiddlewares([(0, _middleware.authMiddleware)(true)]);

exports.updateProductById = updateProductById;