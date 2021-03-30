import { useManualQuery } from "graphql-hooks";
import React, { useCallback, useEffect } from "react";
import useInput from "../utils/useInput";

import styles from "../styles/Channels.module.scss";

const NEW_CHANNEL_MUTATION = `mutation NewChannel($name: String!, $workspace: MongoID!){
  channelCreateOne(record: {name:$name, workspace:$workspace}){
    record{name workspace _id}
  }
}`;

export const Channels = ({
  selectedIndex = 0,
  workspaceId,
  channels,
  onSelect,
  onNewChannel,
  loadingChannels
}) => {
  const [newChannelInput, newChannel, setNewChannel] = useInput({
    placeholder: "Add Channel",
  });
  const [
    createChannel,
    { loading, error, data: createdChannel },
  ] = useManualQuery(NEW_CHANNEL_MUTATION);
  
  const onCreateChannel = useCallback(async () => {
    await createChannel({
      variables: {
        name: newChannel,
        workspace: workspaceId,
      },
    });
    setNewChannel("");
    onNewChannel();
  }, [newChannel]);
  return (
    <div className={styles.Channels}>
      <h3>
        Channels
        <button className={styles.refresh} onClick={onNewChannel}>
          <img src="/static/image_refresh.svg" alt="refresh" />
        </button>
      </h3>
      <div className={styles.inner}>
        <div className={styles.items}>
          {channels.map((channel, index) => (
            <div
              className={
                styles.item + " " + (selectedIndex === index && styles.selected)
              }
              key={index}
            >
              <button onClick={() => onSelect(channel)}>{channel.name}</button>
            </div>
          ))}
        </div>
        {(loadingChannels || loading) && <div className={styles.loading}>Loading...</div>}
        {error && <div>Error loading messages...</div>}
        <div className={styles.inputWrapper}>
          {newChannelInput}
          <button onClick={onCreateChannel}>+</button>
        </div>
      </div>
    </div>
  );
};
