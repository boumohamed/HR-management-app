import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function AjouterDiplome() {

    const InitDiplome = {
        nom: "",
        date: "",
      }
      const InitData = {
        nom: "",
        prenom: "",
        adresse: "", 
        tel: "",
        cnss: "",
        cin: "",
        role: ""
      }
      const [error, setError] = useState(false)
      const [newDiplome, setDiplome] = useState(InitDiplome)
      const [employee, setEmployee] = useState(InitData)
      const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
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
      
      function handleUser(e) {
        const { name, value } = e.target;
        setDiplome({ ...newDiplome, [name]: value });
      }
      function sendUser(e) {
        e.preventDefault()
        let form_date = new FormData();

        form_date.append("employee", employee.id);
        form_date.append("nom", newDiplome.nom);
        form_date.append("date", newDiplome.date);
        axios.post("http://127.0.0.1:8000/api/diplome/add", form_date);
        handleShow()
        console.log('ok')
            
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
                    <Modal.Title><span className="text-success">{newDiplome.nom}</span> ajouté à vos Diplômes</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="success" size="sm" onClick={handleClose}><i className="fas fa-thumbs-up"></i></Button>
                    </Modal.Footer>
                </Modal>
                }
                <h3 className="text-center py-4 text-primary"> Ajoutez un Nouveau Diplôme</h3>
                <Form onSubmit={sendUser}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Diplôme</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nom"
                            onChange={handleUser}  
                            placeholder="Ajouter Diplôme" 
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Date d'obtention</Form.Label>
                        <Form.Control 
                            type="date"
                            name="date"
                            onChange={handleUser}
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
