import React, { useState } from 'react'
import { Form, Button, Container, Modal} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
export default function Register() {

    const InitUser = {
        email: "",
        password: ""
      }

    const [NewUser, setUser] = useState(InitUser)
    const [password, setPassword]  = useState()
    const [valid, setValid] = useState(false)
    function handleUser(e) {
    const { name, value } = e.target;
    setUser({ ...NewUser, [name]: value });
    }
    function sendUser(e)  {
    e.preventDefault()
        let form_date = new FormData();
        if(NewUser.password === password){

        form_date.append("email", NewUser.email);
        form_date.append("password", NewUser.password);
        handleShow()
        axios.post("http://127.0.0.1:8000/api/user/add", form_date);
        //console.log('ok')
        
    }
    }
    const history = useHistory()
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        history.push(`/`)
    }
    return (
        <>
            <h3 className="text-center py-4 text-primary"> Créer un Compte </h3>
            <Container className="py-2">
                    <Modal 
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    
                >
                    <Modal.Header>
                    <Modal.Title>Compte Crée avec <span className="text-success">success</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="success" size="sm" onClick={handleClose}><i className="fas fa-thumbs-up"></i></Button>
                    </Modal.Footer>
                </Modal>
                    <Form onSubmit={sendUser}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                name="email"
                                onChange={handleUser}
                            />
                           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                name="password"
                                onChange={handleUser}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirmez Mot de passe</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                
                                onChange={e => setPassword( e.target.value )}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Ajouter
                        </Button>
                    </Form>
                </Container>
        </>
    )
}
