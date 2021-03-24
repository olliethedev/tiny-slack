import React, { useState } from "react";
import {NavBar} from "./NavBar";
import { useQuery } from "graphql-hooks";
import { Channels } from './Channels';
import { Messages } from './Messages';

const WORKSPACE_QUERY = `query FindWorkspace($id: MongoID!) {
  workspaceOne(filter: { _id: $id }) {
    _id
    name
  }
  channelMany(filter: { workspace: $id }) {
    _id
    name
    messages {created content user}
  }
}`;

export const Chat = ({ id, user }) => {
  const [channel, setChannel] = useState();
  const { loading, error, data } = useQuery(WORKSPACE_QUERY, {
    variables: {
      id,
    },
  });
  return (
    <div>
      {user?.user_metadata?.full_name??user?.email}
      {loading && <div>Loading</div>}
      {data && <div>
        <NavBar />
        <div style={{display: 'flex'}}>
          <Channels channels={data.data.channelMany} onSelect={setChannel} />
          {channel&&<Messages messages={channel?.messages} />}
        </div>
        </div>}
      {error && <div>Got error: {JSON.stringify(error)}</div>}
    </div>
  );
};
