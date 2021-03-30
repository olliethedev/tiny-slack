import { useRouter } from "next/router";
import useNetlifyIdentity from "../utils/useNetlifyIdentity";

const NavBar = ({styles, workspaceName}) => {
  const identity = useNetlifyIdentity();
  const router = useRouter();
  return (
    <div className={styles.nav}>
      {identity.user ? (
        <div className={styles.items}>
            <div className={styles.username}> {identity.user?.user_metadata.full_name}</div>
            <div className={styles.workspaceName}>{workspaceName}</div>
          <button
            onClick={() => {
              identity.doLogout();
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button onClick={identity.doLogin}>Login</button>
      )}
    </div>
  );
};
export default NavBar;