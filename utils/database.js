import mongoose from "mongoose";

export const connect = (databaseUrl) => {
  return mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};