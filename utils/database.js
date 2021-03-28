import mongoose from "mongoose";
let connection;
const connect = async (databaseUrl) => {
  if(connection) {
    return connection;
  }
  try {
    console.log("creating connection");
    connection = await mongoose.createConnection(databaseUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });
    console.log("connected")
    return connection;
  } catch (e) {
    console.error("Could not connect to MongoDB...");
    throw e;
  }
};
const disconnect = async () => {
  await connection.disconnect();
  connection = null;
  return true;
}
const getConnection = () => {
  return connection;
};
const promisify = (func) =>
  new Promise((resolve, reject) => {
    func.then(resolve, reject);
  });

export { getConnection, connect, disconnect, promisify };
