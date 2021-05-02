"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyCart = exports.editItemCart = exports.removeItemCart = exports.addItemCart = exports.updateUserById = exports.createUser = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _graphqlCompose = require("graphql-compose");

var _models = require("../../models");

var _middleware = require("../middleware");

var _isEmpty = _interopRequireDefault(require("is-empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { sendEmail } from "../util/email";
// import jsonwebtoken from 'jsonwebtoken'
const UserITC = (0, _graphqlCompose.toInputObjectType)(_models.UserTC);

const createUser = _graphqlCompose.schemaComposer.createResolver({
  name: "createUser",
  args: {
    record: UserITC
  },
  type: _models.UserTC.getType(),
  resolve: async ({
    args
  }) => {
    const {
      record
    } = args;
    const isUsernameValid = await _models.UserModel.findOne({
      username: record.username
    });
    const isEmailValid = await _models.UserModel.findOne({
      email: record.email
    });

    if (!(0, _isEmpty.default)(isUsernameValid)) {
      throw new _apolloServerExpress.UserInputError("username already exist");
    }

    if (!(0, _isEmpty.default)(isEmailValid)) {
      throw new _apolloServerExpress.UserInputError("email already exist");
    }

    const newUser = new _models.UserModel({
      username: record.username,
      password: record.password,
      email: record.email,
      firstname: record.firstname,
      lastname: record.lastname,
      address: record.address,
      phone: record.phone
    });
    await newUser.save();
    return newUser;
  }
});

exports.createUser = createUser;

const updateUserById = _models.UserTC.getResolver("updateById", [(0, _middleware.authMiddleware)(false)]);

exports.updateUserById = updateUserById;

const productItemTC = _graphqlCompose.schemaComposer.createInputTC(`
    input ProductItemTC {
        productId: ID
        amount: Int
    }
`);

const addItemCart = _graphqlCompose.schemaComposer.createResolver({
  name: "addItemCart",
  args: {
    productItem: productItemTC
  },
  type: _models.UserTC.getType(),
  resolve: async ({
    args,
    context
  }) => {
    if (!context.user) {
      return null;
    }

    const {
      _id
    } = context.user;
    const {
      productItem
    } = args;
    const user = await _models.UserModel.findById(_id);
    const itemIndex = user.cartItem.map(item => item.productId).indexOf(productItem.productId);

    if (productItem.amount > 0) {
      itemIndex != -1 ? user.cartItem[itemIndex].amount += productItem.amount : user.cartItem.push(productItem);
      await user.save();
    }

    return user;
  }
}).withMiddlewares([(0, _middleware.authMiddleware)(false)]);

exports.addItemCart = addItemCart;

const removeItemCart = _graphqlCompose.schemaComposer.createResolver({
  name: "removeItemCart",
  args: {
    productId: "ID"
  },
  type: _models.UserTC.getType(),
  resolve: async ({
    args,
    context
  }) => {
    if (!context.user) {
      return null;
    }

    const {
      _id
    } = context.user;
    const {
      productId
    } = args;
    const user = await _models.UserModel.findById(_id);
    user.cartItem = user.cartItem.filter(item => item.productId != productId);
    await user.save();
    return user;
  }
}).withMiddlewares([(0, _middleware.authMiddleware)(false)]);

exports.removeItemCart = removeItemCart;

const editItemCart = _graphqlCompose.schemaComposer.createResolver({
  name: "editItemCart",
  args: {
    productItem: productItemTC
  },
  type: _models.UserTC.getType(),
  resolve: async ({
    args,
    context
  }) => {
    if (!context.user) {
      return null;
    }

    const {
      _id
    } = context.user;
    const {
      productItem
    } = args;
    const user = await _models.UserModel.findById(_id);
    const itemIndex = user.cartItem.map(item => item.productId).indexOf(productItem.productId);
    const ProductItem = await _models.ProductModel.findById(productItem.productId);
    const ProductStock = (0, _isEmpty.default)(ProductItem) ? 0 : ProductItem.amount;

    if (itemIndex != -1) {
      productItem.amount <= 0 ? user.cartItem.splice(itemIndex, 1) : productItem.amount <= ProductStock ? user.cartItem[itemIndex].amount = productItem.amount : user.cartItem[itemIndex].amount = ProductStock;
    }

    await user.save();
    return user;
  }
}).withMiddlewares([(0, _middleware.authMiddleware)(false)]);

exports.editItemCart = editItemCart;

const emptyCart = _graphqlCompose.schemaComposer.createResolver({
  name: "emptyCart",
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
    user.cartItem = [];
    await user.save();
    return user;
  }
}).withMiddlewares([(0, _middleware.authMiddleware)(false)]); // export const forgotPassword = schemaComposer.createResolver({
//   name: "forgotPassword",
//   args: {
//     email: "String!",
//   },
//   type: "String",
//   resolve: async ({ args }) => {
//     const { email } = args;
//     const user = await UserModel.findOne({ email });
//     if (isEmpty(user)) {
//       throw new UserInputError("email not found");
//     }
//     const token = jsonwebtoken.sign({ _id: user._id }, process.env.SECRET_KEY ?? 'default-secret', { expiresIn: '1d', algorithm: 'HS256' })
//     return sendEmail(email, "PRAMEKUB, Forgot Password Request", "Test Forget Password")
//   },
// });


exports.emptyCart = emptyCart;