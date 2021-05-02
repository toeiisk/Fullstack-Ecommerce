import { gql } from "@apollo/client";

export const UPDATE_STATUS = gql`
mutation updateOrderStatusById ($orderId: ID!, $orderStatus: String!) {
    updateOrderStatusById(orderId: $orderId, orderStatus: $orderStatus) {
        status
  }
}
`
