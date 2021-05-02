"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePromotionById = exports.createPromotion = void 0;

var _models = require("../../models");

var _middleware = require("../middleware");

const createPromotion = _models.PromotionTC.getResolver("createOne", [(0, _middleware.authMiddleware)(true)]);

exports.createPromotion = createPromotion;

const updatePromotionById = _models.PromotionTC.getResolver("updateById", [(0, _middleware.authMiddleware)(true)]);

exports.updatePromotionById = updatePromotionById;