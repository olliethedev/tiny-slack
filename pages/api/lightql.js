import { executeQuery } from "../../utils/graphqlHelper";

// This is the entry point for all our api calls. Can be accessed at /api/graphql
// Correct graphql query will have query and variables fields in the request body.
export default async function handler(req, res) {

    const { query, variables } = req.body; //JSON.parse(req.body);
    const clientContext = req.netlifyFunctionParams?.context?.clientContext;//clientContext.user will contain user data if header Authorization token is valid. note: user.sub is the ID
    const {data,error} = await executeQuery(query, variables, {clientContext});
    console.log({data,error});
    if(data){
      res.status(200).json({ data });
    }else{
      console.log(error);
      res.status(500).json({ error: "GraphQL_Error" });
    }

}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    externalResolver: true,
  },
};
