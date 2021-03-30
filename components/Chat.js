import React, { useEffect, useState, useCallback } from "react";
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

  const [toggle, toggleSelected, setToggleSelected] = useToggle({
    textPositive: "Messages",
    textNegative: "Channels",
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

  const onSelect = useCallback(
    (ch) => {
      if (channel !== ch) {
        setChannel(ch);
        setToggleSelected(ch);
      }
    },
    [channel]
  );
  return (
    <div className={styles.Chat}>
      <div>{xs && toggle}</div>
      {workspace && (
        <>
          <div className={styles.columns}>
            {(!toggleSelected || !xs) && (
              <div>
                <Channels
                  loadingChannels={loading}
                  selectedIndex={workspace.data.channelMany.indexOf(channel)}
                  workspaceId={workspace.data.workspaceOne._id}
                  channels={workspace.data.channelMany}
                  onSelect={onSelect}
                  onNewChannel={update}
                />
              </div>
            )}
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
