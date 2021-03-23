import React from "react";
import Link from "next/link";
import { useQuery } from "graphql-hooks";

const HOMEPAGE_QUERY = `{
  workspaceMany{_id, name}
}`;
export const Workspaces = () => {
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error fetching workspaces</div>}
      {data && (
        <div>
          {data.data.workspaceMany.map((workspace,i) => (
            <div key={i}>
              <Link href={`/workspace/${workspace._id}`}>
                <a>{workspace.name}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
