import { useRouter } from "next/router";
import { useEffect } from "react";
import useGraphQL from "../../utils/useGraphQL";

const Workspace = () => {
  const router = useRouter();
  const { id } = router.query;
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
      {"id":"60517bef789b0a591491bd94"}
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