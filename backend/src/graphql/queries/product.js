import { schemaComposer } from "graphql-compose";
import { ProductModel, ProductTC } from "../../models";

export const productById = ProductTC.getResolver("findById");
export const allProduct = ProductTC.getResolver("findMany");
export const productBySlug = schemaComposer.createResolver({
  name: "productBySlug",
  args: {
    slug: "String!",
  },
  type: ProductTC.getType(),
  resolve: async ({ args }) => {
    const { slug } = args;
    return ProductModel.findOne({ slug });
  },
});
