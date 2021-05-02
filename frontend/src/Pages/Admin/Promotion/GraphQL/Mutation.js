import { gql } from "@apollo/client";

export const CREATE_PROMOTION = gql`
  mutation createPromotion($record: CreateOnePromotionInput!) {
    createPromotion(record: $record) {
      record {
        name
        description
        productId
        startDate
        endDate
        discount
      }
    }
  }
`;

export const UPDATE_PROMOTION = gql`
  mutation updatePromotionById($record: UpdateByIdPromotionInput!, $id: MongoID!) {
    updatePromotionById(record: $record, _id: $id) {
      record {
        name
        description
        productId
        startDate
        endDate
        discount
      }
    }
  }
`;



