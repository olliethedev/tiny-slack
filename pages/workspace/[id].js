import { useRouter } from "next/router";
import { useEffect } from "react";
import useGraphQL from "../../utils/useGraphQL";
import useNetlifyIdentity from '../../utils/useNetlifyIdentity';

const Workspace = () => {
  const router = useRouter();
  const { id } = router.query;
  const identity = useNetlifyIdentity(user => {
    alert(JSON.stringify(user));
  });
  if(!id){
      return <div>No id specified...</div>;
  }
  const [
    isSending,
    data,
    sendRequest,
  ] = useGraphQL(
    `query FindWorkspace($id: MongoID!) {
        workspaceOne(filter: { _id: $id }) {
          _id
          name
        }
        channelMany(filter: { workspace: $id }) {
          _id
          name
          messages {created content user}
        }
      }`,
      {id},
      identity.authedFetch
  );
  useEffect(() => {
    sendRequest("");
  }, [id]);
  return (
    <div>
      Workspace id: {id}
      {isSending ? <div>Loading</div> : <div>{JSON.stringify(data)}</div>}
    </div>
  );
};
export default Workspace;