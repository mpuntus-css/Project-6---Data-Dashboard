import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import DetailView from './components/DetailView'


const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const ACCESS_SECRET = import.meta.env.VITE_APP_ACCESS_SECRET;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div className="app">
          <h1>Petfinder React Dashboard</h1>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/item/:id" element={<DetailView />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
