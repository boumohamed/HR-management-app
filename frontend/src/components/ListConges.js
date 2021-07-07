import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import Loading from './Loading'

export default function ListConges() {

    const [conges, setConges] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(async () => {
        await axios.get('/api/conges')
        .then(res => {
            setConges(res.data)
        })
        .catch(error => console.log(error))
    }
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
            </Container>
         }
        
        </>
    )
}
