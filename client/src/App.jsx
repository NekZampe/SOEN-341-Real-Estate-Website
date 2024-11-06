import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CreateProperties from './pages/CreateProperties'
import DeleteProperties from './pages/DeleteProperties'
import EditProperties from './pages/EditProperties'
import Broker from './pages/Broker'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import ClientPage from './pages/ClientPage'
import SystemAdmin from './pages/SystemAdmin'
import DeleteBroker from './pages/DeleteBroker'
import EditBroker from './pages/EditBroker'
import ShowProperty from './pages/ShowProperty'
import PropertyFilter from './helpers/propertyFilter'
import SubmittedOffersList from './components/submittedOfferList'
import SubmittedVisitRequestsList from './components/SubmittedVisitRequestList'
import BrokerCards from './components/BrokersCards'


const App = () => {
  return (
    <Routes>
      <Route path ='/' element={<LoginPage/>}/>
      <Route path='/Broker' element={<Broker/>}/>
      <Route path ='/SystemAdmin' element={<SystemAdmin/>}/>
      <Route path ='/users/edit/:id' element={ <EditBroker/>}/>
      <Route path ='/users/delete/:id' element={<DeleteBroker />}/>
      <Route path ='/CreateAccount' element={<RegistrationPage />}/>
      <Route path='/ClientPage/*' element={<ClientPage />} />

      <Route path="/properties" element={<PropertyFilter />} />
      <Route path="/viewoffers" element={<SubmittedOffersList />} />
      <Route path="/viewrequests" element={<SubmittedVisitRequestsList />} />
      <Route path="/brokersearch" element={<BrokerCards />} />



      <Route path ='/properties/details/:id' element={<ShowProperty/>}/>
      <Route path ='/properties/create' element={<CreateProperties/>}/>
      <Route path ='/properties/edit/:id' element={ <EditProperties/>}/>
      <Route path ='/properties/delete/:id' element={<DeleteProperties />}/>
    </Routes>
  )
}

export default App