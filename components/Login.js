import React from 'react'
import styles from "../styles/Login.module.scss";

const Login = ({doLogin}) => {
    return (
        <div className={styles.Login}>
          <h2 className={styles.title}>Login to use the app</h2>
          <img className={styles.image} src="/static/image_login.svg" alt="me"/>
          <button onClick={doLogin}>Login</button>
        </div>
    )
}

export default Login
