import React from 'react'
import { Container } from 'react-bootstrap'

export default function AdminPrivileges() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center py-5 h-100">
                <h1 className="loader">Vous n'avez pas le droit <i class="fas fa-frown"></i></h1>
            </Container>
        </>
    )
}
