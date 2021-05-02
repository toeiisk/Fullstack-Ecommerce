"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allOrder = exports.orderById = void 0;

var _models = require("../../models");

const orderById = _models.OrderTC.getResolver("findById");

exports.orderById = orderById;

const allOrder = _models.OrderTC.getResolver("findMany");

exports.allOrder = allOrder;