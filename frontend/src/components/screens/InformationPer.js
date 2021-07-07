import React, { useState, useEffect, useRef } from 'react'
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'

import Loading from '../Loading'

export default function InformationPer() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
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
      const [competences, setCompetences] = useState([])
      const [experiences, setExperiences] = useState([])
      const [fiche, setFiche] = useState({})



      useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/${user.id}`)
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
        }).then( idemp => {
            return  axios.get(`http://127.0.0.1:8000/api/skills/${idemp}`)
        }).then(res => {
            setCompetences(res.data)
            //console.log(res.data)
            return id
        }).catch(error => {
            return id
        }).then( idemp => {
            return  axios.get(`http://127.0.0.1:8000/api/langues/${idemp}`)
        }).then(res => {
            setLangues(res.data)
            //console.log(res.data)
            return id
        }).catch(error => {
            return id
        }).then( idemp => {
            return  axios.get(`http://127.0.0.1:8000/api/experiences/${idemp}`)
        }).then(res => {
            setExperiences(res.data)
            //console.log(res.data)
            setError(false)
            return id
        }).catch(error => {
            return id
        })
        .then( idEmp => {
            return axios.get(`http://127.0.0.1:8000/api/fiche/${idEmp}`)
        }).then(res => {
            setFiche(res.data)
            setError(false)
            //console.log(res.data)
        })
        .catch(error => {
            setError(true)
            //console.log(error)
        })
    } , []
    )

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    })

    return (
        <>
       
         {isLoading?
            <Container className="d-flex justify-content-center align-items-center py-5 h-100">
                <Loading />
            </Container>
            :
            <Container className="py-5">
               

                <Row>
                    <Col sm={12} className="py-2">
                        <Card >
                            <Card.Body>
                                <Card.Title className="text-primary">Information Personnelles</Card.Title>
                                {PersonnelData && PersonnelData.nom !== ""?
                                    <>
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
                                    </>
                                    : null

                                }
                                
                                <LinkContainer to="/myinformations/add">
                                    {PersonnelData && PersonnelData.nom !== ""?
                                        <Button variant="primary">Mettre à jour</Button>                                
                                        :
                                        <Button variant="primary">Ajouter Vos Informations</Button>
                                    }
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} className="py-2">
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-primary">Compétences {/* <Badge className="text-primary" variant="info"> {competences.length} </Badge> */}</Card.Title>
                                {
                                    competences.map(skill => 
                                        <Card.Text key={skill.id}>
                                            {skill.nom}
                                        </Card.Text>
                                        )
                                }
                                
                                <LinkContainer to="/competance/ajouter">
                                    <Button variant="primary">Ajouter Compétence</Button>                                
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} className="py-2">
                        <Card >
                            <Card.Body>
                                <Card.Title className="text-primary">Expériences</Card.Title>
                                {
                                    experiences.map(expr => 
                                        <Card.Text key={expr.id}>
                                            {expr.Poste} à {expr.Entreprise} ( {expr.duree} {expr.duree > 1? "ans" : "an"} )
                                        </Card.Text>
                                        )
                                }
                                
                                <LinkContainer to="/experience/ajouter">
                                    <Button variant="primary">Ajouter Expérience</Button>                                
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} className="py-2">
                        <Card >
                            <Card.Body>
                                <Card.Title className="text-primary">Diplômes  </Card.Title>
                                {
                                    diplomes.map(diplome => 
                                        <Card.Text key={diplome.id}>
                                            {diplome.nom} en {diplome.date}
                                        </Card.Text>
                                        )
                                }
                                <LinkContainer to="/diplome/ajouter">
                                    <Button variant="primary">Ajouter Diplôme</Button>                                
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} className="py-2">
                        <Card >
                            <Card.Body>
                                <Card.Title className="text-primary">Langues</Card.Title>
                                {
                                    langues.map(langue => 
                                        <Card.Text key={langue.id}>
                                            {langue.nom} 
                                        </Card.Text>
                                        )
                                }
                                
                                <LinkContainer to="/langue/ajouter">
                                    <Button variant="primary">Ajouter Langue</Button>                                
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        }


       {/*  <Row>
            {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
            ))}
        </Row> */}
      </>
    )
}
