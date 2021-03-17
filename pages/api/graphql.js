import { ApolloServer } from "apollo-server-micro";
import graphqlSchema from "../../models";
import { connect, disconnect } from "../../utils/database";

export default async function handler(req, res) {
  const apolloHandler = new ApolloServer({
    introspection: true, //can be turned off for production builds
    playground: true, //can be turned off for production builds
    schema: graphqlSchema,
    context: async () => {
      const db = await connect(process.env.MONGO_DB_URL);
      return { db };
    },
  }).createHandler({
    path: "/api/graphql",
  });
  await apolloHandler(req, res);
  await disconnect();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
