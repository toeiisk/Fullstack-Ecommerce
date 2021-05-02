import { gql } from "@apollo/client";

export const GET_PROMOTIONS = gql`
  query allPromotion {
    allPromotion {
      _id
      name
      description
      productId
      startDate
      discount
      endDate
      product {
        _id
        name
        price
        image
        slug
      }
    }
  }
`;

export const GET_PROMOTION = gql`
  query GetPromotion($id: MongoID!) {
    promotionById(_id: $id) {
      _id
      name
      description
      productId
      startDate
      endDate
      discount
      product {
        _id
        name
        description
        image
        slug
      }
    }
  }
`;

export const GET_ACTIVE_PROMOTIONS = gql`
  query activePromotions {
    activePromotions {
      _id
      name
      description
      productId
      startDate
      discount
      endDate
      product {
        _id
        name
        price
        image
        slug
      }
    }
  }
`;