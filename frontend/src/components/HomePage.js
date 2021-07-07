import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import List from './List'
import InformationPer from './screens/InformationPer'



export default function HomePage() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    return (
        <>
        {user && user.is_admin?
        
        <Container>
            <List />
        </Container>
        : 
        <Container>
            <InformationPer />
        </Container>
        }

        </>
    )
}
