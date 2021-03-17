import Head from 'next/head'
import { useCallback, useState } from 'react'
import styles from '../styles/Home.module.scss'

export default function Home() {
  const [isSending, setIsSending] = useState(false)
  const [data, setData] = useState(false);
  const sendRequest = useCallback(async () => {
    if (isSending) return;
    setData(false);
    setIsSending(true);
    const resp = await fetch("/api/hello");
    const respJson = await resp.json();
    setData(respJson);
    setIsSending(false);
  }, [isSending]);
  return (
    <div className={styles.Home}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.title}>Home page</div>
      <button disabled={isSending} onClick={sendRequest}>Call API</button>
      <br/>
      <span>Api Data:{JSON.stringify(data)}</span>
    </div>
  )
}
