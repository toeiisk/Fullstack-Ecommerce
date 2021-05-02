"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartById = void 0;

var _models = require("../../models");

const cartById = _models.CartTC.getResolver("findById");

exports.cartById = cartById;