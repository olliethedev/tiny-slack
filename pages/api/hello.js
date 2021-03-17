// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { graphql } from "graphql";
const {connect} = require('../utils/database');
const {graphqlSchema} = require('../models/Workspace')
async function handler(req, res) {
  console.log(JSON.stringify(req.body));
  console.log(process.env.MONGO_DB_URL);
  connect(process.env.MONGO_DB_URL).then(async (db) => {
    console.log(`Connected to ${process.env.MONGO_DB_URL}`);
    const readItemQuery = `{ workspaceMany { name }}`;
    const createItemQuery = `mutation { workspaceCreateOne( record: { name:"Cool Name Bro"} ) { recordId record {name}} }`;
    console.log(graphqlSchema);
    graphql(graphqlSchema, readItemQuery).then(
      (result) => {
        res.status(200).json({ data:result });
      },
      (err) => {
        console.log(err);
        res.status(500).json({ error: 'GraphQL_Error' });
      }
    );
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'DB_Error' });
  });
}

export default handler;