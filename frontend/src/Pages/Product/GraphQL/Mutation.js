import { gql } from "@apollo/client";

export const ADD_CART = gql`
mutation addItemCart($productItem: ProductItemTC!){
    addItemCart(productItem: $productItem){
        cartItem{
            productId
            amount
        }
    }
}
`

