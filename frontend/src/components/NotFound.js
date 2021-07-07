import React from 'react'
import { Form, Button, Container, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
export default function NotFound() {
    return (
        <>
            <Container className="d-flex justify-content-center align-items-center py-5 h-100">
                <h1 className="loader">Not Found <i class="fas fa-frown"></i></h1>
            </Container>
        </>
    )
}
