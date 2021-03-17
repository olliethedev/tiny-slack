import { ApolloServer } from "apollo-server-micro";
import graphqlSchema  from './models';
import { connect } from './utils/database';

export default new ApolloServer({ schema: graphqlSchema,
  context: async () => {
    const db = await connect(process.env.MONGO_DB_URL);
    return {db};
  } }).createHandler({
  path: "/api/graphql",
});
export const config = {
  api: {
    bodyParser: false,
  },
};
