import mongoose from "mongoose";
let connection;
//creates and caches the database connection
const connect = async (databaseUrl) => {
  if (connection) {
    return connection;
  }
  try {
    console.log("creating connection");
    const connectionSettings = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    };
    // reuse connection instance for local development convinience
    connection = await (process.env.CONTEXT !== "dev"
      ? mongoose.connect(databaseUrl, connectionSettings)
      : mongoose.createConnection(databaseUrl, connectionSettings));
    console.log("connected");
    return connection;
  } catch (e) {
    console.error("Could not connect to MongoDB...");
    throw e;
  }
};

//Disconnects from database
const disconnect = async () => {
  await mongoose.disconnect();
  connection = null;
  console.log("disconnected");
  return true;
};

const getConnection = () => {
  return connection;
};

//Utility function for promisifying mongo functions that dont return a promise
const promisify = (func) =>
  new Promise((resolve, reject) => {
    func.then(resolve, reject);
  });

export { getConnection, connect, disconnect, promisify };
