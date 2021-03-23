import Head from "next/head";
import { useManualQuery } from "graphql-hooks";
import styles from "../styles/Home.module.scss";
import useNetlifyIdentity from "../utils/useNetlifyIdentity";

// const HOMEPAGE_QUERY = `{
//   workspaceMany{_id, name}
// }`
export default function Home() {
  const identity = useNetlifyIdentity();
  // const [fetchUser, { loading, error, data }] = useManualQuery(HOMEPAGE_QUERY);
  return (
    <div className={styles.Home}>
      <Head>
        <title>Tiny-Slack | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.title}>Tiny Slack</div>
      {identity.user ? (
        <div>List</div>
      ) : (
        <>
          <h2 className={styles.subtitle}>Please login to continue</h2>
          <button onClick={identity.doLogin}>Login</button>
        </>
      )}
    </div>
  );
}
