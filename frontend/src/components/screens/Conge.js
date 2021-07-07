import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import Loading from '../Loading'

export default function Conge() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const [conges, setConges] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/${user.id}`)
        .then(res => {
            //console.log(res.data)
            return res.data.id          
        }).then( idEmp => {
            return axios.get(`http://127.0.0.1:8000/api/conge/${idEmp}`)
        }).then(res => {
            setConges(res.data)
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
                {conges && conges.length > 0?

                
                <Table striped bordered hover >
                    <thead>
                        <tr>
                        <th>Type</th>
                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Confirmation</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        conges.map(conge => 
                        <LinkContainer  to={`/conges/${conge.id}`} key={conge.id}>
                            <tr>
                                <td>{conge.type}</td>
                                <td>{conge.dateDebut}</td>
                                <td>{conge.dateFin}</td>
                                <td>{conge.confirm? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>}</td>
                            </tr>
                        </LinkContainer>
                        )
                    }
                    </tbody>
                </Table>
                : 
                    <h3 className="text-secondary d-flex justify-content-center align-items-center py-5 h-100">Vous n'avez pas encore demander un congé</h3>
                }
            </Container>
         }
        
        </>
    )
}
