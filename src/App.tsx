import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { CurrenciesProvider } from './context/currenciesContext'
import Router from './pages/Router'
import './App.scss'

function App() {
  return (
    <CurrenciesProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CurrenciesProvider>
  )
}

export default App
