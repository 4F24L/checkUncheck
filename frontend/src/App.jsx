import React from 'react'
import LandingPage from './pages/LandingPage'
import { Analytics } from "@vercel/analytics/react"
import  {Routes, Route } from 'react-router-dom'
import PrivacyPolicy from './pages/Privacypolicy'
import TermsOfService from './pages/TermsOfsevice'

const App = () => {
  return (
    <>
      <Analytics/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/terms-of-service' element={<TermsOfService/>}/>

      </Routes>
      
    </>
  )
}

export default App