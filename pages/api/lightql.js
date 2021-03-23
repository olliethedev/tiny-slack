import { graphql } from "graphql";
const { connect, disconnect, promisify } = require("../../utils/database");
import graphqlSchema from "../../models";
console.log(process.env.CONTEXT); // note, todo if ==="dev" skip authentication

export default async function handler(req, res) {
  try {
    await connect(process.env.MONGO_DB_URL);//IMPORTANT! always disconnect() or production serverless will stall
    console.log(`Connected to ${process.env.MONGO_DB_URL}`);
    try{
        const {query, variables} = req.body; //JSON.parse(req.body);
        console.log({query, variables});
        console.log(req.netlifyFunctionParams?.context?.clientContext); //clientContext.user will contain user data if header Authorization token is valid. note: user.sub is the ID 
        const result = await promisify(graphql(graphqlSchema, query, null, null, variables));
        await disconnect(); 
        res.status(200).json({ data: result });
    }catch(err){
        console.log(err);
        await disconnect(); 
        res.status(500).json({ error: "GraphQL_Error" });
    }
  } catch (err) {
    res.status(500).json({ error: "DB_Error" });
    return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: "GraphQL_Error" }),
      };
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    externalResolver: true,
  },
};
