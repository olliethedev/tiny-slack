import { useRouter } from "next/router";
import useNetlifyIdentity from "../utils/useNetlifyIdentity";

export const NavBar = () => {
  const identity = useNetlifyIdentity();
  const router = useRouter();
  return (
    <div>
      {identity.user ? (
        <div>
          You are logged in!
          {identity.user && (
            <>Welcome {identity.user?.user_metadata.full_name}!</>
          )}
          <br />
          <button
            onClick={() => {
              identity.doLogout();
              router.push("/");
            }}
          >
            {" "}
            Log out here.
          </button>
        </div>
      ) : (
        <button onClick={identity.doLogin}>Log in here.</button>
      )}
    </div>
  );
};
