import { useRouter } from "next/router";
import { Chat } from '../../components/Chat';
import useNetlifyIdentity from '../../utils/useNetlifyIdentity';


const Workspace = () => {
  const router = useRouter();
  const { id } = router.query;
  const identity = useNetlifyIdentity();
  

  if(!id){
      return <div>No id specified...</div>;
  }
  return (
    <div>
      Workspace id: {id}
      {id && <Chat id={id} user={identity}/> }
    </div>
  );
};
export default Workspace;