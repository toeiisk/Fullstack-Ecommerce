import { schemaComposer, toInputObjectType } from "graphql-compose";
import { ProductModel, ProductTC } from "../../models";
import { authMiddleware } from "../middleware";
import isEmpty from "is-empty";
import { UserInputError } from "apollo-server-express";

const ProductITC = toInputObjectType(ProductTC);
// export const createProduct = ProductTC.getResolver("createOne", [authMiddleware(true)]);
// export const updateProductById = ProductTC.getResolver("updateById", [
//   authMiddleware(true),
// ]);
export const createProduct = schemaComposer
  .createResolver({
    name: "createProduct",
    args: {
      record: ProductITC,
    },
    type: ProductTC.getType(),
    resolve: async ({ args }) => {
      const { record } = args;
      const newProduct = new ProductModel({
        name: record.name,
        description: record.description,
        price: record.price,
        amount: record.amount,
        image: record.image,
        productType: record.productType,
        slug: record.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
      });
      await newProduct.save();
      return newProduct;
    },
  })
  .withMiddlewares([authMiddleware(true)]);

export const updateProductById = schemaComposer
  .createResolver({
    name: "updateProductById",
    args: {
      record: ProductITC,
      _id: "MongoID!",
    },
    type: ProductTC.getType(),
    resolve: async ({ args }) => {
      const { record, _id } = args;
      const product = await ProductModel.findById(_id);
      if (isEmpty(product)) {
        throw new UserInputError("Product not exist");
      }
      product.name = record.name;
      product.description = record.description;
      product.price = record.price;
      product.amount = record.amount;
      product.image = record.image;
      product.productType = record.productType;
      product.slug = record.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      await product.save();
      return product;
    },
  })
  .withMiddlewares([authMiddleware(true)]);
