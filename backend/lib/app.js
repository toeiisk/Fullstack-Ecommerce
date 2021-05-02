"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _apolloServerExpress = require("apollo-server-express");

var _cors = _interopRequireDefault(require("cors"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _graphql = _interopRequireDefault(require("./graphql"));

require("./mongoose-connect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = '/graphql';
const server = new _apolloServerExpress.ApolloServer({
  schema: _graphql.default,
  playground: true,
  context: ({
    req
  }) => ({
    user: req.user
  })
});
const app = (0, _express.default)();
app.use((0, _cookieParser.default)());
app.use(_express.default.json({
  limit: "5mb"
}));
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cors.default)({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(path, (0, _expressJwt.default)({
  secret: process.env.SECRET_KEY ?? 'default-secret',
  algorithms: ['HS256'],
  getToken: req => {
    var _req$cookies, _req$headers, _req$headers$authoriz, _req$headers$authoriz2, _req$query;

    if (req !== null && req !== void 0 && (_req$cookies = req.cookies) !== null && _req$cookies !== void 0 && _req$cookies.token) {
      var _req$cookies2;

      return req === null || req === void 0 ? void 0 : (_req$cookies2 = req.cookies) === null || _req$cookies2 === void 0 ? void 0 : _req$cookies2.token;
    }

    if ((req === null || req === void 0 ? void 0 : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : (_req$headers$authoriz = _req$headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : (_req$headers$authoriz2 = _req$headers$authoriz.split(' ')) === null || _req$headers$authoriz2 === void 0 ? void 0 : _req$headers$authoriz2[0]) === 'Bearer') {
      var _req$headers2, _req$headers2$authori, _req$headers2$authori2;

      return req === null || req === void 0 ? void 0 : (_req$headers2 = req.headers) === null || _req$headers2 === void 0 ? void 0 : (_req$headers2$authori = _req$headers2.authorization) === null || _req$headers2$authori === void 0 ? void 0 : (_req$headers2$authori2 = _req$headers2$authori.split(' ')) === null || _req$headers2$authori2 === void 0 ? void 0 : _req$headers2$authori2[1];
    }

    if (req !== null && req !== void 0 && (_req$query = req.query) !== null && _req$query !== void 0 && _req$query.token) {
      var _req$query2;

      return req === null || req === void 0 ? void 0 : (_req$query2 = req.query) === null || _req$query2 === void 0 ? void 0 : _req$query2.token;
    }

    return null;
  },
  credentialsRequired: false
}), (err, req, res, next) => {
  res.status(200).json({
    errors: [{
      message: err.message
    }]
  });
});
server.applyMiddleware({
  app,
  path,
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});
const port = process.env.PORT ?? 3001;
app.listen({
  port
}, () => {
  console.log(`E-Commerce Server ready at http://localhost:${port}`);
});