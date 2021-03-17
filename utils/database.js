import mongoose from "mongoose";

export const connect = (databaseUrl) => {
  mongoose.disconnect();
  return mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};