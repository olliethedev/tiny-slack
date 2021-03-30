import React, { useEffect, useState } from "react";
import { useManualQuery } from "graphql-hooks";
import { useBreakpoints } from "react-breakpoints-hook";
import useToggle from "../utils/useToggle";
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

  let { xs } =
    process.browser &&
    useBreakpoints({
      xs: { min: 0, max: 420 },
    });

  const [toggle, toggleSelected] = useToggle({
    textPositive: "Messages",
    textNegative: "Channels",
    activeStyle:styles.active
  });
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
          {xs && <div className={styles.toggle}> {toggle} </div>}
          <div className={styles.columns}>
          {(!toggleSelected || !xs) && <div>
                <Channels
                  selectedIndex={workspace.data.channelMany.indexOf(channel)}
                  workspaceId={workspace.data.workspaceOne._id}
                  channels={workspace.data.channelMany}
                  onSelect={setChannel}
                  onNewChannel={update}
                />
              
            </div>}
            {channel && (toggleSelected || !xs) && (
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
