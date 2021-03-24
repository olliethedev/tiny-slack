import { executeQuery } from "../../utils/graphqlHelper";
console.log(process.env.CONTEXT); // note, todo if ==="dev" skip authentication

export default async function handler(req, res) {

    const { query, variables } = req.body; //JSON.parse(req.body);
    console.log(req.netlifyFunctionParams?.context?.clientContext); //clientContext.user will contain user data if header Authorization token is valid. note: user.sub is the ID
    const {data,error} = await executeQuery(query, variables);
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
