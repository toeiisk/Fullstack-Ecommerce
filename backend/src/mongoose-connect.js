import mongoose from "mongoose";

mongoose.Promise = Promise;
mongoose.connect(`mongodb://localhost:27017`, {
  dbName: "ecommerce",
  // user: "borrabeer",
  // pass: process.env.DB_PASSWORD,
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});