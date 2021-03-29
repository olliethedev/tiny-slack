import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.scss";
import { executeQuery } from "../utils/graphqlHelper";
import useNetlifyIdentity from "../utils/useNetlifyIdentity";

const HOMEPAGE_QUERY = `{
  workspaceMany{_id, name}
}`;

const Workspaces = dynamic(() => import("../components/Workspaces"));
const Login = dynamic(() => import("../components/Login"));

export default function Home({ workspaces }) {
  const identity = useNetlifyIdentity();
  return (
    <div className={styles.Home}>
      <Head>
        <title>Tiny-Slack | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.heading}>Tiny Slack</div>
      <div className={styles.content}>
        {identity.user ? (
          <Workspaces workspaces={workspaces} username={identity.user?.user_metadata?.full_name??identity.user.email}/>
        ) : (
          <Login doLogin={identity.doLogin} />
        )}
      </div>
    </div>
  );
}

// this function is called serverside, and client side gets the `workspaces` prop
export async function getServerSideProps({ params }) {
  const { data } = await executeQuery(HOMEPAGE_QUERY);
  return { props: { workspaces: data?.data?.workspaceMany ?? [] } };
}
