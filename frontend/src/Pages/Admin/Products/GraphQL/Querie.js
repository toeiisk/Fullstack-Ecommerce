import { gql } from "@apollo/client";
export const GET_PRODUCTS = gql`
  query allProduct {
    allProduct {
      _id
      name
      description
      price
      amount
      image
      productType
      totalEarning
      activePromotions{
        name
        discount
      }
      discountedPrice
      discountedPercent
      slug
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: MongoID!){
    productById(_id: $id){
        _id
        name
        description
        price
        amount
        image
        productType
        activePromotions{
          name
          discount
        }
        discountedPrice
        discountedPercent
        slug
      }
    }
`

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!){
    productBySlug(slug: $slug){
        _id
        name
        description
        price
        amount
        image
        productType
        activePromotions{
          name
          discount
        }
        discountedPrice
        discountedPercent
        slug
      }
    }
`
