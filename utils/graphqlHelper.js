import { graphql } from "graphql";
const { connect, promisify } = require("./database");
import getSchema from "../models";

export const getGraphQL = async(query, variables, context) =>{
    const graphqlSchema = await getSchema();
    return promisify(graphql(graphqlSchema, query, null, context, variables));
}

export const executeQuery = async(query,variables) =>{
    console.log({ query, variables });
    const out = {data:null, error: false};
    try {
        const db = await connect(process.env.MONGO_DB_URL);
        out.data = await getGraphQL(query, variables, {db});
        console.log({data:out.data});
    } catch (err) {
        out.error = err;
    }
    return out;
}