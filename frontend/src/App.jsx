import React from 'react'
import LandingPage from './pages/LandingPage'
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <>
      <Analytics/>
      <LandingPage/>
    </>
  )
}

export default App