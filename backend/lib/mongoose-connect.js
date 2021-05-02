"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.Promise = Promise;

_mongoose.default.connect(`mongodb+srv://cluster0.8xcag.mongodb.net`, {
  dbName: "ecommerce",
  user: "borrabeer",
  pass: process.env.DB_PASSWORD,
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});