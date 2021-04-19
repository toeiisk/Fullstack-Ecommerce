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
  context: ({ req }) => ({ user: req.user })
});

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(
  path,
  jwt({
    secret: process.env.SECRET_KEY ?? 'default-secret',
    algorithms: ['HS256'],
    getToken: (req) => {
      if (req?.cookies?.token) {
        return req?.cookies?.token
      }
      if (req?.headers?.authorization?.split(' ')?.[0] === 'Bearer') {
        return req?.headers?.authorization?.split(' ')?.[1]
      }
      if (req?.query?.token) {
        return req?.query?.token
      }
      return null
    },
    credentialsRequired: false,
  }),
  (err, req, res, next) => {
    res.status(200).json({
      errors: [
        {
          message: err.message,
        },
      ],
    })
  },
)
server.applyMiddleware({ app, path, cors: { origin: 'http://localhost:3000', credentials: true } })

const port = process.env.PORT ?? 3001;
app.listen({ port }, () => {
  console.log("E-Commerce Server ready at http://localhost:3001");
});
