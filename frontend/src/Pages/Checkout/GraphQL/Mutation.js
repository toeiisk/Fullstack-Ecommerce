import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder($productItem: [ProductItemTC], $paymentMethod: String!){
    createOrder(productItem: $productItem, paymentMethod: $paymentMethod){
      productItem{
        name
        price
        _id
      }
      paymentMethod
  }
}
`;