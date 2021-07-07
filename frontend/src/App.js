
import './App.css';
import axios from 'axios'


import { Route, BrowserRouter, Switch } from 'react-router-dom'
import  NavBar  from './components/NavBar'
import  HomePage  from './components/HomePage'
import  Login  from './components/Login'
import Register from './components/Register'
import List from './components/List'
import AjouterCompetence from './components/AjouterCompetence'
import AjouterDiplome from './components/AjouterDiplome'
import DemandeConge from './components/DemandeConge'
import AjouterInformations from './components/AjouterInformations'
import InformationPer from './components/screens/InformationPer'
import AjouterLangue from './components/AjouterLangue'
import NotFound from './components/NotFound'
import AjouterExperience from './components/AjouterExperience'
import ListConges from './components/ListConges'
import CongeDeatils from './components/screens/CongeDeatils';
import EmployeeDetails from './components/screens/EmployeeDetails'
import EmployeeCv from './components/screens/EmployeeCv';
import AjouterFiche from './components/AjouterFiche'
import AdminPrivileges from './components/AdminPrivileges';
import DownloadCV from './components/screens/DownloadCV'
import MaFiche from './components/screens/MaFiche'
import DownloadFiche from './components/screens/DownloadFiche'
import Conge from './components/screens/Conge';

import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import './styles/style.css'




function App() {

  return (
    
    <>
      <BrowserRouter>
        <main >
              <NavBar/>
              <Switch>
                <PrivateRoute path="/" component={HomePage} exact/>
                <Route path="/login" component={Login} exact/>
                <AdminRoute path="/register" component={Register} exact/>
                <AdminRoute path="/list" component={List} exact/>
                <AdminRoute path="/list/:id" component={EmployeeDetails} exact/>
                <AdminRoute path="/conges" component={ListConges} exact/>
                <AdminRoute path="/conges/:id" component={CongeDeatils} exact />
                <AdminRoute path="/fiche/ajouter/:id" component={AjouterFiche} exact/>
                <PrivateRoute path="/competance/ajouter" component={AjouterCompetence} exact/>
                <PrivateRoute path="/conge" component={Conge} exact/>
                <PrivateRoute path="/cv" component={DownloadCV} exact/>
                <PrivateRoute path="/fiche" component={DownloadFiche} exact/>
                <PrivateRoute path="/fiche/ff" component={MaFiche} exact/>
                <PrivateRoute path="/diplome/ajouter" component={AjouterDiplome} exact/>
                <PrivateRoute path="/experience/ajouter" component={AjouterExperience} exact/>
                <PrivateRoute path="/langue/ajouter" component={AjouterLangue} exact/>
                <PrivateRoute path="/conge/demande" component={DemandeConge} exact/>
                <PrivateRoute path="/myinformations/add" component={AjouterInformations} exact/>
                <PrivateRoute path="/myinformations" component={InformationPer} exact/>
                <PrivateRoute path="/adminprivileges" component={AdminPrivileges} exact/>
                <PrivateRoute path="/**" component={NotFound} exact/>
              </Switch>     
        </main>
        </BrowserRouter>
    </>
  );
}

export default App;
