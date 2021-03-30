import React, { useEffect, useState } from "react";
import { useManualQuery } from "graphql-hooks";
import { Channels } from "./Channels";
import { Messages } from "./Messages";

import styles from "./../styles/Chat.module.scss";

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

  useEffect(() => {
    if (updatedWorkspace) {
      setWorkspace(updatedWorkspace);
      setChannel(updatedWorkspace.data.channelMany[0]);
    }
  }, [updatedWorkspace]);
  return (
    <div className={styles.Chat}>
      {workspace && (
        <>
          <button disabled={loading} onClick={update}>{loading?"Loading latest...":"Refresh channels"}</button>
          <div className={styles.inner}>
            <div>
              <Channels
                workspaceId={workspace.data.workspaceOne._id}
                channels={workspace.data.channelMany}
                onSelect={setChannel}
                onNewChannel={update}
              />
            </div>
            {channel && (
              <Messages name={channel.name} channelId={channel._id} />
            )}
          </div>
        </>
      )}
      {error && <div>Got refreshing error: {JSON.stringify(error)}</div>}
    </div>
  );
};
export default Chat;
