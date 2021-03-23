import "../styles/globals.css";
import { GraphQLClient, ClientContext } from "graphql-hooks";
const client = new GraphQLClient({
  url: "/api/lightql",
});

function MyApp({ Component, pageProps }) {
  return (
    <ClientContext.Provider value={client}>
      <Component {...pageProps} />
    </ClientContext.Provider>
  );
}

export default MyApp;
