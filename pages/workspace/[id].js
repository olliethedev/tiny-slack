import Head from "next/head";
import { useRouter } from "next/router";
import { Chat } from '../../components/Chat';
import useNetlifyIdentity from '../../utils/useNetlifyIdentity';
import { useEffect } from 'react';


const Workspace = () => {
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
      {id && <Chat id={id} user={identity.user}/> }
    </div>
  );
};

export default Workspace;