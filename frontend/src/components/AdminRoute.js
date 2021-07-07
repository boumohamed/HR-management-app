import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function AdminRoute({component : Component , ...rest}) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
       

    return (
        <Route
            {...rest}
            render={props => {
                return user && user.is_admin? <Component {...props} /> : <Redirect to='/adminprivileges' />
            }}
        >          
        </Route>
    )
}



