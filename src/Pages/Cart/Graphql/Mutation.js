import { gql } from "@apollo/client";

export const EDIT_CART = gql`
mutation editItemCart($productItem: ProductItemTC!){
    editItemCart(productItem: $productItem){
        cartItem{
            productId
            amount
        }
    }
}
`

export const REMOVE_ITEM = gql`
mutation removeItemCart($productId: ID){
    removeItemCart(productId: $productId){
        cartItem{
            productId
        }
    }
}
`

export const EMPTY_CART = gql`
    mutation emptyCart{
        emptyCart{
            username
        }
    }
`