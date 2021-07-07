import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Card, Button, Row, Col, Modal} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Loading from '../Loading'

export default function CongeDeatils( { match } ) {

    const [conge, setConge] = useState()
    const [isLoading, setLoading] = useState(true)
    const [employee, setEmployeeData] = useState({})
    const [valid, setValid] = useState(false)
    const history = useHistory()
    
    useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/conges/${match.params.id}`)
        .then(res => {
            setConge(res.data)
            //console.log(res.data)
            return res.data.employee
        }).then( idEmp => {
            return axios.get(`http://127.0.0.1:8000/api/employees/details/${idEmp}`)
        }).then(res => {
            setEmployeeData(res.data)
            //console.log(res.data)
        })
        .catch(error => console.log(error))
    }, []
    )

    
    function ref(){
        window.location.reload();
    }

    function sendConge(Confirmation) {
        let form_data = new FormData();
        form_data.append("confirm", Confirmation);
        axios.put(`http://127.0.0.1:8000/api/conge/update/${conge.id}`, form_data);
        
        //setShow(true)
        //window.location.reload();
        //onTouchTap
        //history.push('/conges')
        //console.log()        
        }
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        history.push("/conges")
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })

    return (
        <>
        {isLoading?
            <Container className="d-flex justify-content-center align-items-center py-5 h-100">
                <Loading />
            </Container>
            : 
            <Container className="py-4">
                 
                    <Modal 
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    
                    >
                        <Modal.Header>
                        <Modal.Title> Congé Modifié</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                        <Button variant="success" size="sm" onClick={handleClose}><i className="fas fa-thumbs-up"></i></Button>
                        </Modal.Footer>
                    </Modal>
                
                <Row>
                    <Col sm={6}>
                        <Card>
                            <Card.Body>
                                    <Card.Title className="text-primary">
                                        Informations du Congé {conge.confirm? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>}
                                    </Card.Title>
                                    <Card.Text>
                                        Date de Début : {conge.dateDebut}
                                    </Card.Text>
                                    <Card.Text>
                                        Date de Fin : {conge.dateFin}
                                    </Card.Text>
                                    <Card.Text>
                                        Type : {conge.type}
                                    </Card.Text>
                                    {conge && conge.confirm?
                                        <Button variant="warning" onClick={(event) => {handleShow(); sendConge(false)}}>Annuler</Button>    
                                        :
                                        <Button variant="success" onClick={(event) => {handleShow(); sendConge(true)}}>Valider</Button>                  
                                    }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-primary">Informations sur l'Employee {/* <Badge className="text-primary" variant="info"> {competences.length} </Badge> */}</Card.Title>
                                    <Card.Text>
                                        Employee : {employee.nom} {employee.prenom}
                                    </Card.Text>
                                    <Card.Text>
                                        Poste : {employee.role}
                                    </Card.Text>
                                    <Card.Text>
                                        CNSS : {employee.cnss}
                                    </Card.Text>
                                    <Card.Text>
                                        Tel : {employee.tel}
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        }
        </>
    )
}
