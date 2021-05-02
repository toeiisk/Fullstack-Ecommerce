"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductTypeById = exports.createProductType = void 0;

var _models = require("../../models");

var _middleware = require("../middleware");

const createProductType = _models.ProductTypeTC.getResolver("createOne", [(0, _middleware.authMiddleware)(true)]);

exports.createProductType = createProductType;

const updateProductTypeById = _models.ProductTypeTC.getResolver("updateById", [(0, _middleware.authMiddleware)(true)]);

exports.updateProductTypeById = updateProductTypeById;