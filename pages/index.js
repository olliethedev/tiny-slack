import Head from 'next/head'
import { NavBar } from '../components/NavBar';
import styles from '../styles/Home.module.scss'
import useGraphQL from '../utils/useGraphQL';

export default function Home() {
  const [isSending, data, sendRequest] = useGraphQL("{workspaceMany{_id, name}}");
  return (
    <div className={styles.Home}>
      <Head>
        <title>Tiny-Slack App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.title}>Home page</div>
      <button disabled={isSending} onClick={sendRequest}>Call API</button>
      <br/>
      <span>Api Data:{JSON.stringify(data)}</span>
    </div>
  )
}
