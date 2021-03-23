import {useEffect, useContext} from "react";
import netlifyIdentity from "netlify-identity-widget";
import useLocalStorage  from "./useLocalStorage";
import { ClientContext } from 'graphql-hooks'

if (process.browser) {
    netlifyIdentity.init();
}
export default function useNetlifyIdentity(onAuthChange) {
  const graphQLContext = useContext(ClientContext);
  const itemChangeCallback = _user => {
    if (_user) {
      graphQLContext.setHeader('Authorization','Bearer ' + _user.token.access_token);
        onAuthChange?.(_user);
    } else {
      graphQLContext.removeHeader('Authorization');
      onAuthChange?.(null);
    }
  };
  const [item, setItem, removeItem] = useLocalStorage(
    'netlifyUserIdentity',
    itemChangeCallback
  );
  
  useEffect(() => {
    netlifyIdentity.on('login', setItem);
    netlifyIdentity.on('logout', removeItem);
  }, []);

  return {
    user: item,
    doLogout: () => netlifyIdentity.logout(),
    doLogin: () => netlifyIdentity.open()
  };
}