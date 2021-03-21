import React, { useEffect, useState } from "react";
import useNetlifyIdentity from '../utils/useNetlifyIdentity';

export const NavBar = () => {
  // let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
  // let [user, setUser] = useState(netlifyAuth.user);
  // console.log({loggedIn, user });
  // let login = () => {
  //   netlifyAuth.authenticate((user) => {
  //     setLoggedIn(!!user);
  //     setUser(user);
  //     netlifyAuth.closeModal();
  //   });
  // };

  // let logout = () => {
  //   netlifyAuth.signout(() => {
  //     setLoggedIn(false);
  //     setUser(null);
  //   });
  // };
  // useEffect(() => {
  //   netlifyAuth.initialize((user) => {
  //     setLoggedIn(!!user);
  //     setUser(user);
  //   });
  // }, [loggedIn]);

  const identity = useNetlifyIdentity(user => {
    alert(JSON.stringify(user));
  });
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
