import React from "react";
import { useQuery } from "graphql-hooks";

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
  const { loading, error, data } = useQuery(WORKSPACE_QUERY, {
    variables: {
      id,
    },
  });
  return (
    <div>
      {user?.user_metadata?.full_name??user?.email}
      {loading && <div>Loading</div>}
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>Got error: {JSON.stringify(error)}</div>}
    </div>
  );
};
