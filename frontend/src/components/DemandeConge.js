import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function DemandeConge() {
    const InitConge = {
        type: "Congé Annuel",
        dateD: "",
        dateF: "",
      }

    const [newConge, setConge] = useState(InitConge)
    const [employee, setEmployee] = useState({})
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const [error, setError] = useState(false)
    const [valid, setValid] = useState(false)
    const history = useHistory()

    useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/${user.id}`)
        .then(res => {
            setEmployee(res.data)
            console.log(res.data)
            setError(false)
            setValid(true)           
        })
        .catch(error => {
            setError(true)
            setValid(false) 
        })
        }
        , [])

      function handleConge(e) {
        const { name, value } = e.target;
        setConge({ ...newConge, [name]: value });
      }

      function sendConge(e) {
        e.preventDefault()
        let form_date = new FormData();
        //console.log(employee)
        form_date.append("employee", employee.id);
        form_date.append("type", newConge.type);
        form_date.append("dateDebut", newConge.dateD);
        form_date.append("dateFin", newConge.dateF);

        axios.post("http://127.0.0.1:8000/api/conge/add", form_date);
        handleShow()
        //console.log(newConge)
            
        }

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        history.push(`/`)
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
                    <Modal.Title>Congé Demandé avec <span className="text-success">success</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="success" size="sm" onClick={handleClose}><i className="fas fa-thumbs-up"></i></Button>
                    </Modal.Footer>
                </Modal>
                }
                <h3 className="text-center py-4 text-primary"> Demandez Votre Congé </h3>
                <Form onSubmit={sendConge}>
                    <Form.Group controlId="formBasicDate" className="mx-1">
                        <Form.Label>Type de Congé</Form.Label>
                        <Form.Control as="select" name="type" onChange={handleConge}>
                            <option value="Congé Annueld">Congé Annuel</option>
                            <option value="Congé Maternité">Congé Maternité</option>
                            <option value="Congé Maladie">Congé Maladie</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date debut</Form.Label>
                        <Form.Control 
                            type="date"
                            name="dateD"
                            onChange={handleConge}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date fin</Form.Label>
                        <Form.Control 
                            type="date"
                            name="dateF"
                            onChange={handleConge}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                </Form>
            </Container>
            
        </>
    )
}
