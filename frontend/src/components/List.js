import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Table, Form, Button, FormControl, Row, Col} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import Loading from './Loading'


export default function List() {

    const initFilter = {
        nom: "",
        prenom: "",
    }
    const [filter, setFilter] = useState(initFilter)

    const [employees, setEmps] = useState([])
    const [FilteredEmployees, setFilteredEmployees] = useState([])
    const [isLoading, setLoading] = useState(true)

    function handleFilter(e) {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
      }
    function Search(e){
        e.preventDefault()
        console.log(filter)
        if(filter.nom === "" && filter.prenom === ""){
            setFilteredEmployees(employees)
        }
        else{
            setFilteredEmployees(employees.filter( emp => (emp.nom).toLowerCase() === (filter.nom).toLowerCase() || (emp.prenom).toLowerCase() === (filter.prenom).toLowerCase()))
        }

    }
    useEffect(async () => {
        await axios.get('/api/employees')
        .then(res => {
            setEmps(res.data)
            setFilteredEmployees(res.data)
        })
        .catch(error => console.log(error))
    }, []
    )
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
            <Container className="py-3">

                
                    <Form onSubmit={Search}>
                    <Row>
                        <Col sm={4}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control 
                                    type="text"  
                                    placeholder="Nom"
                                    name="nom"
                                    onChange={handleFilter}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control 
                                    type="text"  
                                    placeholder="Prenom"
                                    name="prenom"
                                    onChange={handleFilter}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form.Group>
                        </Col>
                    </Row>
                </Form>

                
                        {FilteredEmployees.length > 0?
                        <>
                        <Table striped bordered hover >
                        <thead>
                            <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Poste</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                             {
                                FilteredEmployees.map(employee => 
                                    <LinkContainer  to={`/list/${employee.id}`} key={employee.id}>
        
                                        <tr key={employee.id}>
                                        <td>{employee.nom}</td>
                                        <td>{employee.prenom}</td>
                                        <td>{employee.role}</td>
        
                                        </tr>
                                    </LinkContainer>
                                    )
                            }
                            </tbody>
                             </Table>
                            </>
                            :

                            <h3 className="text-warning d-flex justify-content-center align-items-center py-5 h-100">Aucun Employee correspond à votre recherche</h3>

                        }
                   
            </Container>
         }
        
        </>
    )
}
