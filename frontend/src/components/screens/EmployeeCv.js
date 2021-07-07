import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Loading from '../Loading'

const EmployeeCv = React.forwardRef((props, ref) => {

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
      const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
      const [PersonnelData, setPersonnelData] = useState(InitData)
      const [diplomes, setDiplomes] = useState([])
      const [langues, setLangues] = useState([])
      const [competences, setCompetences] = useState([])
      const [experiences, setExperiences] = useState([])

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
        })
        .catch(error => console.log(error))
    }, []
    )
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    })
    return (
        <>
        {isLoading?
            <Container className="d-flex justify-content-center align-items-center py-5 h-100" ref={ref}>
                <Loading />
            </Container>
            :
            <Container className="py-2" ref={ref}>
               
                <Row>
                    <Col sm={12} className="py-2">
                        <Card border="light">
                            <Card.Body>
                                
                                <Card.Text>
                                            <h2 className="text-primary">{PersonnelData.nom} {PersonnelData.prenom}</h2>
                                            <h4 className="text-secondary">{PersonnelData.role}</h4>
                                        </Card.Text>
                                        <Card.Text>
                                            <i className="fas fa-phone"></i> {PersonnelData.tel} 
                                        </Card.Text>
                                        <Card.Text>
                                            <i className="fas fa-at"></i> {user.email}
                                        </Card.Text>
                                        <Card.Text>
                                            <i className="fas fa-search-location"></i> {PersonnelData.adresse} 
                                        </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12} className="py-2">
                        <Card border="light">
                            <Card.Body>
                                <Card.Title className="text-primary">Expériences Professionnelle </Card.Title>
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
                    <Col sm={12} className="py-2">
                        <Card border="light">
                            <Card.Body>
                                <Card.Title className="text-primary">Formation  </Card.Title>
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
                    <Col sm={12} className="py-2">
                        <Card border="light">
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
                    <Col sm={12} className="py-2">
                        <Card border="light">
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
)
export default EmployeeCv