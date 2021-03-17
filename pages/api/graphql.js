import { ApolloServer } from "apollo-server-micro";
import graphqlSchema  from '../../models';
import { connect } from '../../utils/database';

console.log('Loaded code');
export default new ApolloServer({ schema: graphqlSchema,
  context: async () => {
    console.log('before connection');
    const db = await connect(process.env.MONGO_DB_URL);
    console.log('after connection');
    return {db};
  } }).createHandler({
  path: "/api/graphql",
});
export const config = {
  api: {
    bodyParser: false,
  },
};
