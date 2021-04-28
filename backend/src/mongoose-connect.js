import mongoose from "mongoose";

mongoose.Promise = Promise;
mongoose.connect(
  `mongodb://docdb-2021-04-28-10-33-17.cluster-co08z1ygs8vo.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`,
  {
    dbName: "ecommerce",
    user: "borrabeer",
    pass: process.env.DB_PASSWORD,
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
