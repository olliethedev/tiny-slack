import { useManualQuery } from 'graphql-hooks';
import React, { useCallback } from "react";
import useInput from '../utils/useInput';

export const Messages = ({ messages }) => {
    const [ messageInput, message, setMessage] = useInput({elementTypeTextArea:true});
    // useManualQuery()
    const handleSend = useCallback(()=>{
        alert(message);
        setMessage("");
    }, [message]);
  return (
    <div>
      <h3>Messages</h3>
      {messages?.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
      {messageInput}
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
