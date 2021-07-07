import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

    const InitUser = {
        email: "",
        password: "",
        id: 0,
        is_active: false,
        is_admin: false,
        is_staff: false,
      }
      const history = useHistory()
      const [NewUser, setUser] = useState(InitUser)
      const [authUser, setAuthuser] = useState(InitUser)
      const [error, setError] = useState(false)

      function handleUser(e) {
        const { name, value } = e.target;
        setUser({ ...NewUser, [name]: value });
      }
      function sendUser(e) {
        e.preventDefault()
        let form_date = new FormData();
        form_date.append("email", NewUser.email);
        form_date.append("password", NewUser.password);
        
        axios
        .post("http://127.0.0.1:8000/api/login", form_date)
        .then(res => {
            setAuthuser(res.data) 
            console.log(authUser)
            setError(false)
        }).catch(error => {

            setError(true)
        })

         if(authUser && authUser.email !== ''){
            localStorage.setItem('currentUser', JSON.stringify(authUser));
            history.push('/')
            window.location.reload(true);
        } 

         
      }

      useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 5000)
    })
      
    return (
        <>
            <Container className="test">
            {error && 
                    <Modal 
                    show={error}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                    <Modal.Title className="text-danger"> Ressayer <i class="fas fa-frown"></i></Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="danger" size="sm" onClick={() => setError(false)} ><i class="fas fa-times"></i></Button>
                    </Modal.Footer>
                </Modal>
                }
                    <Form onSubmit={sendUser}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                               type="email" 
                               placeholder="Enter email" 
                               type="text"
                               name="email"
                               onChange={handleUser}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control 
                               type="password" 
                               placeholder="Enter password" 
                               name="password"
                               onChange={handleUser} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Connexion
                        </Button>
                    </Form>
                </Container>
            
        </>
    )
}
