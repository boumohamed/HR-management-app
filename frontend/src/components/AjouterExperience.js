import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function AjouterExperience() {

    const InitData = {
        nom: "",
        prenom: "",
        adresse: "", 
        tel: "",
        cnss: "",
        cin: "",
        role: ""
    }
    const initExp = {
        poste: "",
        entreprise: "",
        duree: "",
    }
    const [newExp, setExp] = useState(initExp)
    const [employee, setEmployee] = useState(InitData)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const [valid, setValid] = useState(false)
    const history = useHistory()

    useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/${user.id}`)
        .then(res => {
            setEmployee(res.data)
            setValid(true)                    
        })
        .catch(error => {
            console.log(error)
            setValid(false)
        })
        }
        , [])
    
    function handleExp(e) {
        const { name, value } = e.target;
        setExp({ ...newExp, [name]: value });
        }

    function sendExp(e) {
    e.preventDefault()
    let form_date = new FormData();

    form_date.append("employee", employee.id);
    form_date.append("poste", newExp.poste);
    form_date.append("entreprise", newExp.entreprise);
    form_date.append("duree", newExp.duree);
    axios.post("http://127.0.0.1:8000/api/experience/add", form_date);
    handleShow()
    //console.log(newExp)
        
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
                    <Modal.Title>Expérience ajoutée avec <span className="text-success">success</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="success" size="sm" onClick={handleClose}><i className="fas fa-thumbs-up"></i></Button>
                    </Modal.Footer>
                </Modal>
                }
                <h3 className="text-center py-4 text-primary"> Ajoutez une Nouvelle Expérience</h3>
                <Form onSubmit={sendExp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Poste</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="poste"
                            onChange={handleExp}  
                            placeholder="Ajouter Poste" 
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Entreprise</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="entreprise"
                            onChange={handleExp}  
                            placeholder="Ajouter Entreprise" 
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Durée (ans)</Form.Label>
                        <Form.Control 
                            type="number"
                            name="duree"
                            onChange={handleExp}
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
