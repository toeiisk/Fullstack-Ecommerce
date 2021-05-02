import { gql } from "@apollo/client";
export const GET_ORDERS = gql`
  query allOrder {
    allOrder {
        _id
        userId
        status
        user{
          firstname
          lastname
        }
        productItem{
            name
            productId
            price
            discountedPrice
            discountedPercent
            amount
        }
        paymentMethod
    }
  }
`;

export const GET_ORDER = gql`
  query orderById($id: MongoID!){
    orderById(_id: $id){
      _id
    status
    user{
      firstname
      lastname
      address
      phone
    }
    productItem{
      _id
      name
      amount
      price
      discountedPrice
      discountedPercent
      image
    }
    paymentMethod
    }
}
`


export const GET_COUNT_CUSTOMER= gql`
  query allUsersCount($filter: FilterCountUserInput){
    allUsersCount(filter: $filter)
  }
`