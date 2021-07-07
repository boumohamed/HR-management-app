import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'


export default function PrivateRoute({component : Component , ...rest}) {
   
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))

    return (
        <Route
            {...rest}
            render={props => {
                return user && user.email !== "" ? <Component {...props} /> : <Redirect to='/login' />
            }}
        >          
        </Route>
    )
}