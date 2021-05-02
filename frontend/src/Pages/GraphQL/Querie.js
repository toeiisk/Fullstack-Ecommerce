import { gql } from '@apollo/client'

export const ME_QUERY = gql`
query {
  me {
        _id
        username
        email
        isStaff
        firstname
        lastname
        address
        phone
        cartItem{
          productId
          amount
		    }
        cartItemProduct{
          _id
          name
          description
          image
          price
          discountedPrice
          discountedPercent
      }
  }
}
`