import Head from "next/head";
import { Workspaces } from '../components/Workspaces';
import styles from "../styles/Home.module.scss";
import { executeQuery } from '../utils/graphqlHelper';
import useNetlifyIdentity from "../utils/useNetlifyIdentity";


export default function Home({workspaces}) {
  console.log(workspaces);
  const identity = useNetlifyIdentity();
  return (
    <div className={styles.Home}>
      <Head>
        <title>Tiny-Slack | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.title}>Tiny Slack</div>
      {identity.user ? (
        <>
          <div>{identity.user?.user_metadata?.full_name??identity.user.email}, pick your Workspace:</div>
          <Workspaces workspaces={workspaces}/>
        </>
      ) : (
        <>
          <h2 className={styles.subtitle}>Please login to continue</h2>
          <button onClick={identity.doLogin}>Login</button>
        </>
      )}
    </div>
  );
}

// this function is called serverside, and client side gets the `workspaces` prop
export async function getServerSideProps({ params }) {
  const HOMEPAGE_QUERY = `{
    workspaceMany{_id, name}
  }`;
  const {data}= await executeQuery(HOMEPAGE_QUERY);
  return { props: { workspaces: data.data.workspaceMany } }
}