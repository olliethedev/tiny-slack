import React, { useEffect } from "react";

export const Channels = ({ channels, onSelect }) => {
  useEffect(() => {
    onSelect(channels[0]);
  }, []);
  return (
    <div>
      <h3>Channels</h3>
      {channels.map((channel, index) => (
        <div key={index}>
          <button onClick={() => onSelect(channel)}>{channel.name}</button>
        </div>
      ))}
    </div>
  );
};
