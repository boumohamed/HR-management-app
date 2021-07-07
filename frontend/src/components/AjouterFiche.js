import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'

export default function AjouterFiche( { match } ) {

    const InitData = {
        nom: "",
        prenom: "",
        adresse: "", 
        tel: "",
        cnss: "",
        cin: "",
        role: ""
    }
    const initFiche = {
        
        salaire: 0,
    }
    const [newFiche, setFiche] = useState(initFiche)
    const [employee, setEmployee] = useState(InitData)

    const [valid, setValid] = useState(false)
    const [existe, setExiste] = useState(false)
    const history = useHistory()

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        history.push(`/list/${employee.id}`)
    }


    useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/details/${match.params.id}`)
        .then(res => {
            setEmployee(res.data)
            //console.log(res.data)
            
            setValid(true)
            return match.params.id                    
        }).then( id => {
            return axios.get(`http://127.0.0.1:8000/api/fiche/${id}`)
        }).then(res => {
            setExiste(true)
            setFiche(res.data)
            setValid(true)
            
        })
        .catch(error => {
            //console.log(error)
            setExiste(false)
            
        })
        }
        , [])

    
    function handleFiche(e) {
        const { name, value } = e.target;
        setFiche({ ...newFiche, [name]: value });
        }

    function sendFiche(e) {
        e.preventDefault()
        let form_date = new FormData();
    
        form_date.append("employee", employee.id);
        form_date.append("salaire", newFiche.salaire);
        //axios.post("http://127.0.0.1:8000/api/fiche/add", form_date);
        if(existe){
            axios.put(`http://127.0.0.1:8000/api/fiche/update/${newFiche.id}`, form_date)
        }
        else{
            axios.post("http://127.0.0.1:8000/api/fiche/add", form_date);
        }
        handleShow()
        //console.log(newFiche)
            
        }

        const [isLoading, setLoading] = useState(true)
        useEffect(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
    return (
        <>
         {isLoading?
            <Container className="d-flex justify-content-center align-items-center py-5 h-100">
                <Loading />
            </Container>
            :
            <Container className="py-2">
            <LinkContainer to={`/list/${employee.id}`}>            
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
                    <Modal.Title>Salaire modifié avec <span className="text-success">success</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="success" size="sm" onClick={handleClose}><i className="fas fa-thumbs-up"></i></Button>
                    </Modal.Footer>
                </Modal>
                }
                <h3 className="text-center py-4 text-primary"> Ajoutez le Salaire</h3>
                <Form onSubmit={sendFiche}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Salaire</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="salaire"
                            onChange={handleFiche}  
                            placeholder="Ajouter Salaire" 
                            value={newFiche.salaire}
                            required
                        />
                    </Form.Group>
                    {existe?
                    <Button variant="primary" type="submit">
                        Mettre à jour
                    </Button>
                    :
                    <Button variant="primary" type="submit">
                        Valider
                    </Button>
                    }
                </Form>
            </Container>
}
            
        </>
    )
}
