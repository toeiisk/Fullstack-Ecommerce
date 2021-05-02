"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCart = void 0;

var _models = require("../../models");

var _middleware = require("../middleware");

const createCart = _models.CartTC.getResolver("createOne", [(0, _middleware.authMiddleware)(false)]);

exports.createCart = createCart;