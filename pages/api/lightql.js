import { graphql } from "graphql";
const { connect } = require("../../utils/database");
import graphqlSchema from "../../models";
const handler = async (req, res) => {
  console.log(JSON.parse(req.body).query);
  console.log(process.env.MONGO_DB_URL);
  try {
    await connect(process.env.MONGO_DB_URL);
    console.log(`Connected to ${process.env.MONGO_DB_URL}`);
    graphql(graphqlSchema, JSON.parse(req.body).query).then(
      (result) => {
          console.log("got result")
        res.status(200).json({ data: result });
      },
      (err) => {
        console.log("got error")
        console.log(err);
        res.status(500).json({ error: "GraphQL_Error" });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DB_Error" });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    externalResolver: true,
  },
};
