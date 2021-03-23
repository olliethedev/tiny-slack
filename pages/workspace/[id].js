import { useRouter } from "next/router";
import { Chat } from '../../components/Chat';
import Link from "next/link";
import useNetlifyIdentity from '../../utils/useNetlifyIdentity';
import { useEffect } from 'react';


const Workspace = () => {
  const router = useRouter();
  const { id } = router.query;
  const identity = useNetlifyIdentity();
  console.log(identity.user)
  useEffect(()=>{
    if(id&&!identity.user) {
      router.push("/");
    }
  },[])

  if(!id){
      return <div>No id specified...</div>;
  }
  return (
    <div>
      Workspace id: {id}
      {id && <Chat id={id} user={identity.user}/> }
    </div>
  );
};
export default Workspace;