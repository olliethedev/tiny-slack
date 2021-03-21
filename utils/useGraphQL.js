import { useCallback, useState } from 'react';

//query string example "{workspaceMany{_id, name}}"
const useGraphQL = (query, variables, fetchFunc)=>{
    if(!fetchFunc)
      fetchFunc = fetch;
    console.log({query, variables});
    const [isSending, setIsSending] = useState(false)
    const [data, setData] = useState(false);
    const sendRequest = useCallback(async () => {
      if (isSending) return;
      setData(false);
      setIsSending(true);
      const resp = await fetchFunc("/api/lightql",{
        method: 'POST',
        body:JSON.stringify({query,variables})
      });
      const respJson = await resp.json();
      setData(respJson);
      setIsSending(false);
    }, [isSending]);

    return [isSending, data, sendRequest];
}

export default useGraphQL;