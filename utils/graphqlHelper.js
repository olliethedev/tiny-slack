import { graphql } from "graphql";
const { connect, disconnect, promisify } = require("./database");
import getSchema from "../models";

export const getGraphQL = async(query, variables, context) =>{
    const graphqlSchema = await getSchema();
    console.log("got schema");
    return promisify(graphql(graphqlSchema, query, null, context, variables));
}

export const executeQuery = async(query,variables, context={}) =>{
    console.log({ query, variables });
    const out = {data:null, error: false};
    try {
        context.db = await connect(process.env.MONGO_DB_URL);
        out.data = await getGraphQL(query, variables, context);
        if (process.env.CONTEXT !== "dev") {
            await disconnect();
        }
    } catch (err) {
        out.error = err;
    }
    return out;
}