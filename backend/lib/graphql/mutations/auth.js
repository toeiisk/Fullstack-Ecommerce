"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogin = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphqlCompose = require("graphql-compose");

var _isEmpty = _interopRequireDefault(require("is-empty"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("../../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoginPayload = _graphqlCompose.schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    token: 'String',
    user: _models.UserTC.getType()
  }
});

const userLogin = _graphqlCompose.schemaComposer.createResolver({
  name: "userLogin",
  args: {
    username: 'String!',
    password: 'String!'
  },
  type: LoginPayload,
  resolve: async ({
    args
  }) => {
    const {
      username,
      password
    } = args;
    const user = await _models.UserModel.findOne({
      username
    });

    if ((0, _isEmpty.default)(user)) {
      throw new _apolloServerExpress.UserInputError("Username not found");
    }

    const isValid = await user.verifyPassword(password);

    if (!isValid) {
      throw new _apolloServerExpress.UserInputError("Incorrect password");
    }

    return {
      token: _jsonwebtoken.default.sign({
        _id: user._id
      }, process.env.SECRET_KEY ?? 'default-secret', {
        expiresIn: '1d',
        algorithm: 'HS256'
      }),
      user
    };
  }
});

exports.userLogin = userLogin;