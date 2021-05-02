"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activePromotions = exports.allPromotion = exports.promotionById = void 0;

var _graphqlCompose = require("graphql-compose");

var _models = require("../../models");

const promotionById = _models.PromotionTC.getResolver("findById");

exports.promotionById = promotionById;

const allPromotion = _models.PromotionTC.getResolver("findMany");

exports.allPromotion = allPromotion;

const activePromotions = _graphqlCompose.schemaComposer.createResolver({
  name: "activePromotions",
  type: [_models.PromotionTC],
  resolve: () => {
    return _models.PromotionModel.find({
      startDate: {
        $lte: new Date(new Date().setUTCHours(new Date().getUTCHours() + 7)).toISOString()
      },
      endDate: {
        $gt: new Date(new Date().setUTCHours(new Date().getUTCHours() + 7)).toISOString()
      }
    });
  }
});

exports.activePromotions = activePromotions;