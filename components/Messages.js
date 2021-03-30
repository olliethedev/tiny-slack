import { useManualQuery } from "graphql-hooks";
import React, { useCallback, useEffect, useRef } from "react";
import useInput from "../utils/useInput";
import useNetlifyIdentity from "../utils/useNetlifyIdentity";
import Message from "../components/Message";

import styles from "../styles/Messages.module.scss";

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
  const messagesEndRef = useRef(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = useCallback(() => {
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
  }, [newMessage, channelId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.Messages}>
      <h3>
        {name} Messages
        <button className={styles.refresh} onClick={updateMessages}>
          <img src="/static/image_refresh.svg" alt="refresh" />
        </button>
      </h3>
      <div className={styles.inner}>
        <div className={styles.items}>
          {loading && <div>Loading...</div>}
          {error && <div>Error loading messages...</div>}
          {messages?.data.messageMany.length === 0 && (
            <img src="/static/image_empty.svg" alt="empty" />
          )}
          {messages?.data.messageMany.map((message, index) => (
            <Message
              identity={identity}
              styles={styles}
              message={message}
              key={index}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.inputWrapper}>
          {messageInput}
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};
