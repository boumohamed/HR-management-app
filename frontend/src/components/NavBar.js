import React, { useState } from 'react'
import { Navbar , Nav, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useHistory } from 'react-router-dom'


export default function NavBar() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const history = useHistory()
    function Logout(){
        
         localStorage.removeItem('currentUser')
        window.location.reload(false);
        history.push('/login') 
        
    }

    return (
        <>
            
            <Navbar bg="light" expand="lg" variant="light">
                <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >EMSI HR <i className="fas fa-users text-primary"></i></Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <Nav className="me-auto">
                    {user?
                    <>
                        {!user.is_admin?
                        <>
                        <LinkContainer to="/">
                            <Nav.Link> Mes informations</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/conge">
                            <Nav.Link> Mes Congés </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/conge/demande">
                            <Nav.Link> Demande Congé </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Fiche">
                            <Nav.Link> Ma Fiche </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cv">
                            <Nav.Link> Mon CV </Nav.Link>
                        </LinkContainer>
                        </>
                        :
                        <>
                            <LinkContainer to="/list">
                                <Nav.Link> Employees </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/conges">
                                <Nav.Link> Congés demandés </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Nav.Link> Nouveau Compte</Nav.Link>
                            </LinkContainer>
                        </>
                        }
                    </>
                    : null
                    } 
                   </Nav>
                   {user?
                    <Nav>
                        <LinkContainer to="/">
                                <Nav.Link>  <i className="fas fa-user text-primary"> </i>  {user.email}</Nav.Link>
                            </LinkContainer>
                        <Button variant="primary" size="sm" onClick={Logout}>Deconnexion</Button>
                    </Nav>
                    :null
                   }
                    
                    
                    
                
                   
                </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </>
    )
}
