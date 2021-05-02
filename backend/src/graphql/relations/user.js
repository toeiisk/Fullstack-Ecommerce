import { schemaComposer } from "graphql-compose";
import { ProductModel, ProductTC, UserTC } from "../../models";

const cartItemTC = schemaComposer.createInputTC(`
    input CartItemTC {
        productId: ID
        amount: Int
    }
`);

const productItemResolver = schemaComposer.createResolver({
  name: "product",
  type: [ProductTC],
  args: {
    cartItem: [cartItemTC],
  },
  resolve: ({ source, args, context, info }) => {
    const { cartItem } = args;
    const cartItemProductId = [];
    cartItem.forEach((product) => {
      cartItemProductId.push(product.productId);
    });
    return ProductModel.find({ _id: { $in: cartItemProductId } });
  },
});

UserTC.addRelation("cartItemProduct", {
  resolver: () => productItemResolver,
  prepareArgs: {
    cartItem: (source) => source.cartItem,
  },
  projection: { cartItem: true },
});
