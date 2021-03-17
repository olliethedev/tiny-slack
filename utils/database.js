import mongoose from "mongoose";

export const connect = (databaseUrl) => {
  return mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export const promisify = (func) => new Promise((resolve, reject) => {
  func.then(
    resolve,
    reject,
  );
})