import React from "react";
import Link from "next/link";

export const Workspaces = ({workspaces}) => {
  return (
    <div>
      {workspaces && (
        <div>
          {workspaces.map((workspace,i) => (
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
