"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productBySlug = exports.allProduct = exports.productById = void 0;

var _graphqlCompose = require("graphql-compose");

var _models = require("../../models");

const productById = _models.ProductTC.getResolver("findById");

exports.productById = productById;

const allProduct = _models.ProductTC.getResolver("findMany");

exports.allProduct = allProduct;

const productBySlug = _graphqlCompose.schemaComposer.createResolver({
  name: "productBySlug",
  args: {
    slug: "String!"
  },
  type: _models.ProductTC.getType(),
  resolve: async ({
    args
  }) => {
    const {
      slug
    } = args;
    return _models.ProductModel.findOne({
      slug
    });
  }
});

exports.productBySlug = productBySlug;