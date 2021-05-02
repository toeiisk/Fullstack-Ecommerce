"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;

var _apolloServerErrors = require("apollo-server-errors");

var _models = require("../../models");

const authMiddleware = isStaff => async (resolve, source, args, context, info) => {
  if (context.user) {
    const user = await _models.UserModel.findById(context.user._id);

    if (isStaff && user.isStaff || !isStaff && user) {
      return resolve(source, args, context, info);
    } else {
      throw new _apolloServerErrors.AuthenticationError("You don't have permission");
    }
  }

  throw new _apolloServerErrors.AuthenticationError("You must be authorized");
};

exports.authMiddleware = authMiddleware;