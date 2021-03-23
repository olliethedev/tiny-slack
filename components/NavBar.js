import useNetlifyIdentity from '../utils/useNetlifyIdentity';

export const NavBar = () => {
  const identity = useNetlifyIdentity();
  return (
    <div>
      {identity.user ? (
        <div>
          You are logged in!
          {identity.user && <>Welcome {identity.user?.user_metadata.full_name}!</>}
          <br />
          <button onClick={identity.doLogout}>Log out here.</button>
        </div>
      ) : (
        <button onClick={identity.doLogin}>Log in here.</button>
      )}
    </div>
  );
};
