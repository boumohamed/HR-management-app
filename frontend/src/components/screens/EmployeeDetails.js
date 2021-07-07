import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import Loading from '../Loading'


export default function EmployeeDetails( { match } ) {
 


    const [isLoading, setLoading] = useState(true)
    let id = null
    const InitData = {
        nom: "",
        prenom: "",
        adresse: "", 
        tel: "",
        cnss: "",
        cin: "",
        role: ""
      }
      const [PersonnelData, setPersonnelData] = useState(InitData)
      const [diplomes, setDiplomes] = useState([])
      const [langues, setLangues] = useState([])
      const [fiche, setFiche] = useState({})
      const [competences, setCompetences] = useState([])
      const [experiences, setExperiences] = useState([])

    useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/details/${match.params.id}`)
        .then(res => {
            setPersonnelData(res.data)
            id = res.data.id
            //console.log(res.data)
            return id
        }).then( idemp => {
            return  axios.get(`http://127.0.0.1:8000/api/diplomes/${idemp}`)
        }).then(res => {
            setDiplomes(res.data)
            //console.log(res.data)
            return id
        }).catch(error => {
            return id 
        }).then(idemp => {
            return  axios.get(`http://127.0.0.1:8000/api/langues/${idemp}`)
        }).then(res => {
            setLangues(res.data)
            return id
        }).catch(error =>{
            return id
        }).then(idemp => {
            return  axios.get(`http://127.0.0.1:8000/api/experiences/${idemp}`)
        }).then(res => {
            setExperiences(res.data)
            return id
        }).catch(error => {
            return id
        }).then(idemp => {
            return  axios.get(`http://127.0.0.1:8000/api/skills/${idemp}`)
        }).then(res => {
            setCompetences(res.data)
            return id
        }).catch( error =>{
            return id
        })
        .then(idEmp => {
            return axios.get(`http://127.0.0.1:8000/api/fiche/${idEmp}`)
        }).then( res => {
            setFiche(res.data)
        })
        .catch(error => console.log(error))
    }, []
    )
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2600)
    })
    return (
        <>
        {isLoading?
            <Container className="d-flex justify-content-center align-items-center py-5 h-100">
                <Loading />
            </Container>
            :
            <Container className="py-2">
                <LinkContainer to={'/list'} className="mx-2">            
                    <Button variant="danger">Retour</Button>
                </LinkContainer>
               <LinkContainer to={`/fiche/ajouter/${PersonnelData.id}`}>
                    <Button variant="primary">Fiche de paie</Button>                                
                </LinkContainer>
                <Row>
                    <Col sm={12} className="py-2">
                        <Card border="primary">
                            <Card.Body>
                                <Card.Title className="text-primary">Information Personnelles</Card.Title>
                                <Card.Text>
                                            {PersonnelData.nom} {PersonnelData.prenom}
                                        </Card.Text>
                                        <Card.Text>
                                            CNSS : {PersonnelData.cnss} 
                                        </Card.Text>  
                                        <Card.Text>
                                            CIN : {PersonnelData.cin} 
                                        </Card.Text>
                                        <Card.Text>
                                            Tel : {PersonnelData.tel} 
                                        </Card.Text>
                                        <Card.Text>
                                            Role : {PersonnelData.role} 
                                        </Card.Text>
                                        <Card.Text>
                                            Adresse : {PersonnelData.adresse} 
                                        </Card.Text>

                                        <Card.Text>
                                            Salaire : {fiche.salaire} MAD
                                        </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} className="py-2">
                        <Card border="primary">
                            <Card.Body>
                                <Card.Title className="text-primary">Compétences {/* <Badge className="text-primary" variant="info"> {competences.length} </Badge> */}</Card.Title>
                                {
                                    competences.map(skill => 
                                        <Card.Text key={skill.id}>
                                            {skill.nom}
                                        </Card.Text>
                                        )
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} className="py-2">
                        <Card border="primary">
                            <Card.Body>
                                <Card.Title className="text-primary">Expériences</Card.Title>
                                {
                                    experiences.map(expr => 
                                        <Card.Text key={expr.id}>
                                            {expr.Poste} à {expr.Entreprise} ( {expr.duree} {expr.duree > 1? "ans" : "an"} )
                                        </Card.Text>
                                        )
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} className="py-2">
                        <Card border="primary">
                            <Card.Body>
                                <Card.Title className="text-primary">Diplômes  </Card.Title>
                                {
                                    diplomes.map(diplome => 
                                        <Card.Text key={diplome.id}>
                                            {diplome.nom} en {diplome.date}
                                        </Card.Text>
                                        )
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} className="py-2">
                        <Card border="primary">
                            <Card.Body>
                                <Card.Title className="text-primary">Langues</Card.Title>
                                {
                                    langues.map(langue => 
                                        <Card.Text key={langue.id}>
                                            {langue.nom} 
                                        </Card.Text>
                                        )
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        }
        </>
    )
}
