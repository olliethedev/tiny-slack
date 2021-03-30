import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useNetlifyIdentity from "../../utils/useNetlifyIdentity";
import { useEffect } from "react";
import { executeQuery } from "../../utils/graphqlHelper";
import { useManualQuery } from "graphql-hooks";

import styles from "../../styles/Workspace.module.scss";
import NavBar from "../../components/NavBar";

const WORKSPACE_QUERY = `query FindWorkspace($id: MongoID!) {
  workspaceOne(filter: { _id: $id }) {
    _id
    name
    userCount
    users {name email}
  }
  channelMany(filter: { workspace: $id }) {
    _id
    name
  }
}`;

const WORKSPACE_JOIN_MUTATION = `mutation JoinWorkspace($name: String!, $email: String!, $avatar_url:String!, $workspaceId: MongoID!) {
  userCreateOne(workspaceId:$workspaceId, name:$name, email:$email, avatar_url:$avatar_url){
    name
    users {name email _id}
  }
}`;

const Chat = dynamic(() => import("../../components/Chat"));

const Workspace = ({ workspace }) => {
  const workspaceOne = workspace.data.workspaceOne;
  const router = useRouter();
  const { id } = router.query;
  const identity = useNetlifyIdentity();
  const [register, { loading, error, data: updatedWorkspace }] = useManualQuery(
    WORKSPACE_JOIN_MUTATION
  );
  //Initial render
  useEffect(() => {
    if (!identity.user) {
      // redirect home if not loggedin
      router.push("/");
    } else if (
      workspaceOne.users.filter((u) => u.email === identity.user.email)
        .length === 0
    ) {
      //if not registered, register
      register({
        variables: {
          avatar_url: identity?.user?.user_metadata?.avatar_url,
          name: identity?.user?.user_metadata?.full_name,
          email: identity?.user?.email,
          workspaceId: id,
        },
      });
    }
  }, []);

  if (!id) {
    return <div>No id specified...</div>;
  }
  return (
    <div className={styles.Workspace}>
      <Head>
        <title>Tiny-Slack | Workspace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.content}>
        <NavBar styles={styles} workspaceName={workspaceOne.name} />
        <div className={styles.inner}>
          Workspace Users: {workspaceOne.userCount}
          {loading && <div>Registering new user...</div>}
          {(error || updatedWorkspace?.errors) && (
            <div>Failed registration...</div>
          )}
          {updatedWorkspace && <div>Registered!!!</div>}
          {id && (
            <Chat id={id} user={identity.user} initialWorkspace={workspace} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;

// this function is called serverside, and client side gets the `workspaces` prop
export async function getServerSideProps({ params }) {
  const { data } = await executeQuery(WORKSPACE_QUERY, { id: params.id });
  return { props: { workspace: data } };
}
