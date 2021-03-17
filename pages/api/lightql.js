import { graphql } from "graphql";
const { connect, promisify } = require("../../utils/database");
import graphqlSchema from "../../models";

export default async function handler(req, res) {
  console.log(JSON.parse(req.body).query);
  console.log(process.env.MONGO_DB_URL);
  res.status(200).json({ data: "hello" });
//   try {
//     await connect(process.env.MONGO_DB_URL);
//     console.log(`Connected to ${process.env.MONGO_DB_URL}`);
//     try{
//         const result = await promisify(graphql(graphqlSchema, JSON.parse(req.body).query));
//         console.log("got result:"+result);
//         res.status(200).json({ data: result });
//         return {
//             statusCode: 200,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ data: result }),
//           };
//     }catch(err){
//         console.log("got error")
//         console.log(err);
//         res.status(500).json({ error: "GraphQL_Error" });
//         return {
//             statusCode: 500,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ error: "GraphQL_Error" }),
//           };
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "DB_Error" });
//     return {
//         statusCode: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ error: "GraphQL_Error" }),
//       };
//   }
};


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    externalResolver: true,
  },
};
