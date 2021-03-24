import Head from "next/head";
import { useRouter } from "next/router";
import { Chat } from '../../components/Chat';
import useNetlifyIdentity from '../../utils/useNetlifyIdentity';
import { useEffect } from 'react';
import { executeQuery } from '../../utils/graphqlHelper';

const WORKSPACE_QUERY = `query FindWorkspace($id: MongoID!) {
  workspaceOne(filter: { _id: $id }) {
    _id
    name
  }
  channelMany(filter: { workspace: $id }) {
    _id
    name
    messages {created content user}
  }
}`;

const Workspace = ({workspace}) => {
  const router = useRouter();
  const { id } = router.query;
  const identity = useNetlifyIdentity();
  useEffect(()=>{
    if(!identity.user) {
      router.push("/");
    }
  },[])

  if(!id){
      return <div>No id specified...</div>;
  }
  return (
    <div>
      <Head>
        <title>Tiny-Slack | Workspace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Workspace id: {id}
      {id && <Chat id={id} user={identity.user} initialWorkspace={workspace} /> }
    </div>
  );
};

export default Workspace;

// this function is called serverside, and client side gets the `workspaces` prop
export async function getServerSideProps({ params }) {
  console.log({params})
  const {data}= await executeQuery(WORKSPACE_QUERY, {id:params.id});
  return { props: { workspace: data} }
}