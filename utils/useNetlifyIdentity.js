import React from "react";


import netlifyIdentity from "netlify-identity-widget";
import useLocalStorage  from "./useLocalStorage";

if (process.browser) {
    netlifyIdentity.init();
}
export default function useNetlifyIdentity(onAuthChange) {
  if (!onAuthChange) throw new Error('onAuthChange cannot be falsy');
  const itemChangeCallback = _user => {
    if (_user) {
        onAuthChange(_user);
    } else {
      onAuthChange(null);
    }
  };
  const [item, setItem, removeItem] = useLocalStorage(
    'netlifyUserIdentity',
    itemChangeCallback
  );
  React.useEffect(() => {
    netlifyIdentity.on('login', setItem);
    netlifyIdentity.on('logout', removeItem);
  }, []);

  // definition - `item` comes from  useNetlifyIdentity hook
  const genericAuthedFetch = (endpoint, obj = {}) => {
    if (!item || !item.token || !item.token.access_token)
      throw new Error('no user token found');
    const defaultObj = {
      headers: {
        Authorization: 'Bearer ' + item.token.access_token
      }
    };
    const finalObj = Object.assign(defaultObj, obj);
    return fetch(endpoint, finalObj).then(res =>
      finalObj.headers['Content-Type'] === 'application/json' ? res.json() : res
    );
  };
  return {
    user: item,
    doLogout: () => netlifyIdentity.logout(),
    doLogin: () => netlifyIdentity.open(),
    authedFetch: genericAuthedFetch
  };
}