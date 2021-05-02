"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allUsersCount = exports.allUsers = exports.userById = exports.me = void 0;

var _graphqlCompose = require("graphql-compose");

var _models = require("../../models");

const me = _graphqlCompose.schemaComposer.createResolver({
  name: "me",
  type: _models.UserTC.getType(),
  resolve: async ({
    context
  }) => {
    if (!context.user) {
      return null;
    }

    const {
      _id
    } = context.user;
    const user = await _models.UserModel.findById(_id);
    return user;
  }
});

exports.me = me;

const userById = _models.UserTC.getResolver("findById");

exports.userById = userById;

const allUsers = _models.UserTC.getResolver("findMany");

exports.allUsers = allUsers;

const allUsersCount = _models.UserTC.getResolver("count");

exports.allUsersCount = allUsersCount;