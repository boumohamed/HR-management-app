import React, { useEffect, useState} from 'react'
import { Container, Card } from 'react-bootstrap'
import axios from 'axios'
import Loading from '../Loading'


const MaFiche = React.forwardRef((props, ref) => {

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
      const [fiche, setFiche] = useState({})
      const [error, setError] = useState(false)
      let date = new Date()
      let logo = 'https://www.guide-metiers.ma/wp-content/uploads/2015/04/emsi_couleurs.png'

      useEffect(async () => {
        await axios.get(`http://127.0.0.1:8000/api/employees/${user.id}`)
        .then(res => {
            setPersonnelData(res.data)
            id = res.data.id
            //console.log(res.data)
            return id            
        }).then( idEmp => {
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
                <Container className="d-flex justify-content-center align-items-center py-5 h-100" ref={ref}>
                    <Loading />
                </Container>
                :
                <Container className="py-5" ref={ref}>
                    <img src={logo} className="img" />
                    <h1 className="d-flex justify-content-center align-items-center py-2" >Fiche de Paie</h1>
                   <Card border="light py-3">
                    <h6>Casablanca, le {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} à {date.getHours()}:{date.getMinutes()}</h6>
                        <Card.Body>
                            {PersonnelData && PersonnelData.nom !== ""?
                                <>
                                    <Card.Text>
                                        Nom et Prénom : {PersonnelData.nom} {PersonnelData.prenom} 
                                    </Card.Text>
                                    <Card.Text>
                                         CNSS : {PersonnelData.cnss}
                                    </Card.Text>  
                                    <Card.Text>
                                         CIN : {PersonnelData.cin}  
                                    </Card.Text>
                                    <Card.Text>
                                        Salaire : {fiche.salaire} MAD 
                                    </Card.Text>
                                </>
                                : null
                            }
                        </Card.Body>
                    </Card>
                    
                </Container>
            }
        </>
    )
}
)

export default MaFiche