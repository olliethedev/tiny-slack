import { ApolloServer } from "apollo-server-micro";
import getSchema from "../../models";
import { connect } from "../../utils/database";

// Used to display GraphQL Playground UI on dev under http://localhost:8888/api/graphql
// can be disables for smaller production executable
export default async function handler(req, res) {
  const db = await connect(process.env.MONGO_DB_URL);
  const graphqlSchema = await getSchema();
  const apolloHandler = new ApolloServer({
    introspection: true, //can be turned off for production builds
    playground: true, //can be turned off for production builds
    schema: graphqlSchema,
    context: async () => {
      return { db };
    },
  }).createHandler({
    path: "/api/graphql",
  });
  await apolloHandler(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
