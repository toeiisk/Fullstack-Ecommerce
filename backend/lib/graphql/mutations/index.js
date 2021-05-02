"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require("./user");

Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _user[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _user[key];
    }
  });
});

var _order = require("./order");

Object.keys(_order).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _order[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _order[key];
    }
  });
});

var _product = require("./product");

Object.keys(_product).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _product[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _product[key];
    }
  });
});

var _promotion = require("./promotion");

Object.keys(_promotion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _promotion[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _promotion[key];
    }
  });
});

var _auth = require("./auth");

Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _auth[key];
    }
  });
});