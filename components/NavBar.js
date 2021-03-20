import React, { useEffect, useState } from 'react'
import netlifyAuth from '../utils/netlifyIdentity'
export const NavBar = () => {
    let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
    let [user, setUser] = useState(null)
    let login = () => {
        netlifyAuth.authenticate((user) => {
          setLoggedIn(!!user)
          setUser(user)
          netlifyAuth.closeModal()
        })
      }
      
      let logout = () => {
        netlifyAuth.signout(() => {
          setLoggedIn(false)
          setUser(null)
        })
      }
    useEffect(() => {
    netlifyAuth.initialize((user) => {
        setLoggedIn(!!user)
        setUser(user)
    })
    }, [loggedIn])
    return (
        <div>
            {loggedIn ? (
                <div>
                    You are logged in!
                
                    {user && <>Welcome {user?.user_metadata.full_name}!</>}
                    <br /> 
                    <button onClick={logout}>
                    Log out here.
                    </button>
                </div>
                ) : (
                <button onClick={login}>
                    Log in here.
                </button>
            )}
        </div>
    )
}
