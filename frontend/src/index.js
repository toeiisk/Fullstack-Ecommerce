import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { SessionProvider } from "./context/auth";
import { setContext } from '@apollo/client/link/context';
import { PaymentProvider } from './context/payment'


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : undefined,
    'client-name': 'WidgetX Ecom [web]',
    'client-version': '1.0.0'
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SessionProvider>
        <PaymentProvider>
        <App />
        </PaymentProvider>
      </SessionProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
