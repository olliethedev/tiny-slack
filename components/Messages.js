import React from "react";

export const Messages = ({ messages }) => {
  return (
    <div>
      <h3>Messages</h3>
      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
    </div>
  );
};
