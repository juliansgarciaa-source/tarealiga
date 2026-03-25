import { BrowserRouter as Router, Route, Routes, Link } from 'react-router'
import { useState } from 'react'
import './App.css'
import Equipo from './equipo'
import Favoritos from './favoritos'
import Home from './home'
import Informativa from './informativa'
import Original from './original'
import Usuario from './usuario'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
    <nav className="c.menu">
      <p><Link to="/Favoritos">Favoritos</Link></p>
      <p><Link to="/Equipo">Equipo</Link></p>
      <p><Link to="/Home">home</Link></p>
      <p><Link to="/Informativa">informativa</Link></p>
      <p><Link to="/Original">original</Link></p>
      <p><Link to="/Usuario">Usuarios</Link></p>
    </nav>
    <Routes>
      <Route path="/Favoritos" element={<Favoritos/>}  />
      <Route path="/Equipo" element={<Equipo/>}  />
      <Route path="/Home" element={<Home/>}  />
      <Route path="/Informativa" element={<Informativa/>}  />
      <Route path="/Original" element={<Original/>}  />
      <Route path="/Usuario" element={<Usuario/>}  />
    </Routes>
    </Router>  

    
    
   
    </>
  )
}

export default App
