import { useManualQuery, useQuery } from "graphql-hooks";
import React, { useCallback, useEffect } from "react";
import useInput from "../utils/useInput";
import useNetlifyIdentity from "../utils/useNetlifyIdentity";

import styles from "../styles/Messages.module.scss"

const MESSAGES_QUERY = `query FindMessages($id: MongoID!) {
  messageMany(filter: { channel: $id }) {
    _id
    created
    content
    user {name email}
  }
}`;
const NEW_MESSAGE_MUTATION = `mutation NewMessage($content: String!, $email: String!, $channelId: MongoID!) {
  messageCreateOne( content: $content, email: $email, channelId: $channelId){
    _id
    content
    created
    user {name email}
  }
}`;

export const Messages = ({ name, channelId }) => {
  const identity = useNetlifyIdentity();
  const [messageInput, message, setMessage] = useInput({
    elementTypeTextArea: true,
  });
  const [
    createNewMessage,
    { loading: loadingNewMessage, error: newMessageError, data: newMessage },
  ] = useManualQuery(NEW_MESSAGE_MUTATION);
  const [updateMessages, { loading, error, data: messages }] = useManualQuery(
    MESSAGES_QUERY,
    {
      variables: {
        id: channelId,
      },
    }
  );
  const handleSend = useCallback(() => {
    alert(message);
    createNewMessage({
      variables: {
        channelId,
        content: message,
        email: identity.user.email,
      },
    });
    setMessage("");
  }, [message]);
  useEffect(() => {
    updateMessages();
    console.log({ messages });
  }, [newMessage, channelId]);
  console.log({ channelId, messages });
  return (
    <div className={styles.Messages}>
      <h3>{name} Messages</h3>
      {loading&&<div>Loading...</div>}
      {error&&<div>Error loading messages...</div>}
      {messages?.data.messageMany.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
      {messageInput}
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
