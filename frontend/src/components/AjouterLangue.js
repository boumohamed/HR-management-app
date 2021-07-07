import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function AjouterLangue() {

        const InitData = {
            nom: "",
            prenom: "",
            adresse: "", 
            tel: "",
            cnss: "",
            cin: "",
            role: ""
        }
        const initLangue = {
            nom: "",
        }

        const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
        const [langue, setLangue] = useState(initLangue)
        const [employee, setEmployee] = useState(InitData)
        const [error, setError] = useState(false)
        const [valid, setValid] = useState(false)
        const history = useHistory()


        useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/${user.id}`)
        .then(res => {
            setEmployee(res.data)
            setError(false)
            setValid(true)           
        })
        .catch(error => {
            setError(true)
            setValid(false) 
        })
        }
        , [])

      function handleLangue(e) {
        const { name, value } = e.target;
        setLangue({ ...langue, [name]: value });
      }
      function sendLangue(e) {
        e.preventDefault()
        let form_date = new FormData();

        form_date.append("employee", employee.id);
        form_date.append("nom", langue.nom);
        handleShow()
        axios.post("http://127.0.0.1:8000/api/langue/add", form_date);
        //console.log('ok')
            
        }


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        history.push("/")
    }
    return (
        <>
            <Container className="py-2">
                <LinkContainer to="/">            
                    <Button variant="danger" size="sm">Retour</Button>
                </LinkContainer>
                {valid && 
                    <Modal 
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    
                    >
                        <Modal.Header>
                        <Modal.Title><span className="text-success">{langue.nom}</span> ajoutée à vos Langues</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                        <Button variant="success" size="sm" onClick={handleClose}><i className="fas fa-thumbs-up"></i></Button>
                        </Modal.Footer>
                    </Modal>
                }
                <h3 className="text-center py-4 text-primary"> Ajoutez une Nouvelle Langue</h3>
                <Form onSubmit={sendLangue}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Langue</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nom"
                            onChange={handleLangue}  
                            placeholder="Ajouter Langue" 
                            required
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
