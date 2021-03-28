import { useManualQuery, useQuery } from "graphql-hooks";
import React, { useCallback, useEffect } from "react";
import useInput from "../utils/useInput";
import useNetlifyIdentity from "../utils/useNetlifyIdentity";

const MESSAGES_QUERY = `query FindMessages($id: MongoID!) {
  messageMany(filter: { channel: $id }) {
    _id
    created
    content
    user {name email}
  }
}`;
const NEW_MESSAGE_MUTATION = `mutation NewMessage($content: String!, $user: MongoID!, $channel: MongoID!) {
  messageCreateOne( record: {content: $content, user:$user, channel:$channel}){
    record {
      _id
      content
      created
      user {name email}
    }
  }
}`;

export const Messages = ({ name, channelId }) => {
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
        channel: channelId,
        content: message,
        user: "605c1917ea999b604fb9f86b",
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
    <div>
      <h3>{name} Messages</h3>
      {messages?.data.messageMany.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
      {messageInput}
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
