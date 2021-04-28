import mongoose from "mongoose";
import fs from "fs";
const ca = [fs.readFileSync("./rds-combined-ca-bundle.pem")];

mongoose.Promise = Promise;
mongoose.connect(
  `mongodb://borrabeer:${process.env.DB_PASSWORD}@docdb-2021-04-28-10-33-17.cluster-co08z1ygs8vo.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`,
  {
    promiseLibrary: Promise,
    useNewUrlParser: true,
    sslValidate: true,
    sslCA: ca,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
