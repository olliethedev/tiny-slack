import React from "react";
import Link from "next/link";
import styles from "../styles/Workspaces.module.scss";

const Workspaces = ({ username, workspaces = [] }) => (
  <div className={styles.Workspaces}>
    <h1 className={styles.title}>{username},</h1>
    <h2 className={styles.subtitle}>select workspace:</h2>
    {workspaces.map((workspace, i) => (
      <div className={styles.workspace} key={i}>
        <Link href={`/workspace/${workspace._id}`}>
          <a>{workspace.name}</a>
        </Link>
      </div>
    ))}
  </div>
);
export default Workspaces;
