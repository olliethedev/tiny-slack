import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { useManualQuery } from "graphql-hooks";
import { Channels } from "./Channels";
import { Messages } from "./Messages";

const WORKSPACE_QUERY = `query FindWorkspace($id: MongoID!) {
  workspaceOne(filter: { _id: $id }) {
    _id
    name
    users {name email}
  }
  channelMany(filter: { workspace: $id }) {
    _id
    name
  }
}`;

 const Chat = ({ id, user, initialWorkspace }) => {
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [channel, setChannel] = useState();
  const [update, { loading, error, data: updatedWorkspace }] = useManualQuery(
    WORKSPACE_QUERY,
    {
      variables: {
        id,
      },
    }
  );

  console.log({ workspace, initialWorkspace, updatedWorkspace });
  useEffect(() => {
    if (updatedWorkspace) {
      setWorkspace(updatedWorkspace);
      setChannel(updatedWorkspace.data.channelMany[0]);
    }
  }, [updatedWorkspace]);
  return (
    <div>
      <span>{user?.user_metadata?.full_name ?? user?.email}</span>
      
      {workspace && (
        <div>
          <NavBar />
          <button onClick={update}>Refresh channels</button>
          {loading && <div>Loading latest</div>}
          <div style={{ display: "flex" }}>
            <Channels
              workspaceId={workspace.data.workspaceOne._id}
              channels={workspace.data.channelMany}
              onSelect={setChannel}
              onNewChannel={update}
            />
            {channel && <Messages name={channel.name} channelId={channel._id} />}
          </div>
        </div>
      )}
      {error && <div>Got refreshing error: {JSON.stringify(error)}</div>}
    </div>
  );
};
export default Chat;