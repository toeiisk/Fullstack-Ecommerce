import { schemaComposer } from "graphql-compose";
import { ProductModel, UserModel, UserTC } from "../../models";
import { authMiddleware } from "../middleware";
import isEmpty from "is-empty";

export const createUser = UserTC.getResolver("createOne");
export const updateUserById = UserTC.getResolver("updateById", [
  authMiddleware(false),
]);

const productItemTC = schemaComposer.createInputTC(`
    input ProductItemTC {
        productId: ID
        amount: Int
    }
`);

export const addItemCart = schemaComposer
  .createResolver({
    name: "addItemCart",
    args: {
      productItem: productItemTC,
    },
    type: UserTC.getType(),
    resolve: async ({ args, context }) => {
      if (!context.user) {
        return null;
      }
      const { _id } = context.user;
      const { productItem } = args;
      const user = await UserModel.findById(_id);
      const itemIndex = user.cartItem
        .map((item) => item.productId)
        .indexOf(productItem.productId);
      if (productItem.amount > 0) {
        itemIndex != -1
          ? (user.cartItem[itemIndex].amount += productItem.amount)
          : user.cartItem.push(productItem);
        await user.save();
      }
      return user;
    },
  })
  .withMiddlewares([authMiddleware(false)]);

export const removeItemCart = schemaComposer
  .createResolver({
    name: "removeItemCart",
    args: {
      productId: "ID",
    },
    type: UserTC.getType(),
    resolve: async ({ args, context }) => {
      if (!context.user) {
        return null;
      }
      const { _id } = context.user;
      const { productId } = args;
      const user = await UserModel.findById(_id);
      user.cartItem = user.cartItem.filter(
        (item) => item.productId != productId
      );
      await user.save();
      return user;
    },
  })
  .withMiddlewares([authMiddleware(false)]);

export const editItemCart = schemaComposer
  .createResolver({
    name: "editItemCart",
    args: {
      productItem: productItemTC,
    },
    type: UserTC.getType(),
    resolve: async ({ args, context }) => {
      if (!context.user) {
        return null;
      }
      const { _id } = context.user;
      const { productItem } = args;
      const user = await UserModel.findById(_id);
      const itemIndex = user.cartItem
        .map((item) => item.productId)
        .indexOf(productItem.productId);
      const ProductItem = await ProductModel.findById(productItem.productId);
      const ProductStock = isEmpty(ProductItem) ? 0 : ProductItem.amount;
      if (itemIndex != -1) {
        productItem.amount <= 0
          ? user.cartItem.splice(itemIndex, 1)
          : productItem.amount <= ProductStock
          ? (user.cartItem[itemIndex].amount = productItem.amount)
          : (user.cartItem[itemIndex].amount = ProductStock);
      }
      await user.save();
      return user;
    },
  })
  .withMiddlewares([authMiddleware(false)]);

export const emptyCart = schemaComposer
  .createResolver({
    name: "emptyCart",
    type: UserTC.getType(),
    resolve: async ({ context }) => {
      if (!context.user) {
        return null;
      }
      const { _id } = context.user;
      const user = await UserModel.findById(_id);
      user.cartItem = [];
      await user.save();
      return user;
    },
  })
  .withMiddlewares([authMiddleware(false)]);
