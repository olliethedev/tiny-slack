import { ApolloServer } from "apollo-server-micro";
import graphqlSchema from "../../models";
import { connect, disconnect } from "../../utils/database";

console.log("Loaded code");
export default async function handler(req, res) {
  const apolloHandler = new ApolloServer({
    introspection: true,
    playground: true,
    schema: graphqlSchema,
    context: async () => {
      console.log("before connection");
      const db = await connect(process.env.MONGO_DB_URL);
      console.log("after connection");
      return { db };
    },
  }).createHandler({
    path: "/api/graphql",
  });
  await apolloHandler(req, res);
  console.log("handler called");
  await disconnect();
  console.log("disconnected");
}
export const config = {
  api: {
    bodyParser: false,
  },
};
