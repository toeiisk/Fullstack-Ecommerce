import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation CreateUser($record: UserInput!) {
    createUser(record: $record) {
      username
      email
      isStaff
      firstname
      lastname
      address
      phone
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation userLogin($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
        isStaff
        firstname
        lastname
        address
        phone
        cartItem {
          productId
          amount
        }
      }
    }
  }
`;
