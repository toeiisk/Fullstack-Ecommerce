"use strict";

var _models = require("../../models");

_models.PromotionTC.addRelation('product', {
  resolver: () => _models.ProductTC.getResolver("findById"),
  prepareArgs: {
    _id: source => source.productId
  },
  projection: {
    productId: true
  }
});