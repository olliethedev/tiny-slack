import { graphql } from "graphql";
const { connect, disconnect, promisify } = require("./database");
import graphqlSchema from "../models";
export const getGraphQL = async(query, variables) =>{
    return promisify(graphql(graphqlSchema, query, null, null, variables));
}

export const executeQuery = async(query,variables) =>{
    console.log({ query, variables });
    const out = {data:null, error: false};
    try {
        await connect(process.env.MONGO_DB_URL);//IMPORTANT! always disconnect() or production serverless will stall
        out.data = await getGraphQL(query, variables);
        console.log({data:out.data});
    } catch (err) {
        out.error = err;
    } finally {
        await disconnect(); 
    }
    return out;
}