import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import cors from 'cors';
import jwt from 'express-jwt'
import cookieParser from "cookie-parser";

import schema from "./graphql";
import "./mongoose-connect";

const path = '/graphql'
const server = new ApolloServer({
  schema,
  playground: true,
  // context: ({ req }) => ({ user: req.user })
});

const app = express();
app.use(cookieParser());
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cors())

server.applyMiddleware({ app, cors: "*"})

const port = process.env.PORT ?? 3001;
app.listen({ port }, () => {
  console.log("E-Commerce Server ready at http://localhost:3001");
});
