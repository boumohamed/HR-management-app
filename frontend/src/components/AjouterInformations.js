import React, { useState, useEffect } from 'react'
import { Form, Button, Container} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export default function AjouterInformations() {

    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
    const [existe, setExist] = useState(false)
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
    const history = useHistory()
    useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/${user.id}`)
        .then(res => {
            setPersonnelData(res.data)
            setExist(true)
        })
        .catch(error => {
            setExist(false)
        })
    }
    , [])

      function handleUser(e) {

        const { name, value } = e.target;
        setPersonnelData({ ...PersonnelData, [name]: value });
      }

      function sendInfo(e) {
        e.preventDefault()
          let form_date = new FormData();
          // we'll need the id user
            form_date.append("user", user.id);
            form_date.append("nom", PersonnelData.nom);
            form_date.append("prenom", PersonnelData.prenom);
            form_date.append("adresse", PersonnelData.adresse);
            form_date.append("tel", PersonnelData.tel);
            form_date.append("cnss", PersonnelData.cnss);
            form_date.append("cin", PersonnelData.cin);
            form_date.append("role", PersonnelData.role);
            if(existe){
                axios.put(`http://127.0.0.1:8000/api/employees/update/${PersonnelData.id}`, form_date)
            }
            else{
                axios.post("http://127.0.0.1:8000/api/informations/add", form_date);
            }
            //console.log(PersonnelData)   
            history.push("/") 
            window.location.reload(true);
         
      }
    return (
        <>
            <Container className="py-1">
                <LinkContainer to="/">            
                    <Button variant="danger" size="sm">Retour</Button>
                </LinkContainer>
                <h3 className="text-center py-4 text-primary"> Mes Informations </h3>
                <Form onSubmit={sendInfo}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nom" 
                            type="text"
                            name="nom"
                            value={PersonnelData.nom}
                            onChange={handleUser}
                            required
                        />
                        
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Prenom</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Prenom"
                            name="prenom"
                            value={PersonnelData.prenom}
                            onChange={handleUser}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Adresse"
                            name="adresse"
                            value={PersonnelData.adresse}
                            onChange={handleUser}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Tel</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="telephone"
                            name="tel"
                            value={PersonnelData.tel}
                            onChange={handleUser}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>CNSS</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Immatriculation cnss"
                            name="cnss"
                            value={PersonnelData.cnss}
                            onChange={handleUser}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>CIN</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="CIN"
                            name="cin"
                            value={PersonnelData.cin}
                            onChange={handleUser}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Role</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Poste"
                            name="role"
                            value={PersonnelData.role}
                            onChange={handleUser}
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
        </>
    )
}
