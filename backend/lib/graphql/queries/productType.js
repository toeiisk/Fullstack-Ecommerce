"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allProductType = exports.productTypeById = void 0;

var _models = require("../../models");

const productTypeById = _models.ProductTypeTC.getResolver("findById");

exports.productTypeById = productTypeById;

const allProductType = _models.ProductTypeTC.getResolver("findMany");

exports.allProductType = allProductType;