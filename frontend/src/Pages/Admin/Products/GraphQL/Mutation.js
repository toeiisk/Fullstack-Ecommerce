import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation createProduct($record: ProductInput!) {
    createProduct(record: $record) {
      name
      description
      price
      amount
      image
      productType
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProductById($record: ProductInput!, $id: MongoID!) {
    updateProductById(record: $record, _id: $id) {
      name
      description
      price
      amount
      image
      productType
    }
  }
`;
