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

  const [favoritos, setFavoritos] = useState<any[]>([]);

  return (
    <Router>

      {/* MENU */}
      <nav className="c-menu">
        <p><Link to="/favoritos">Favoritos</Link></p>
        <p><Link to="/home">Home</Link></p>
        <p><Link to="/informativa">Informativa</Link></p>
        <p><Link to="/original">Original</Link></p>
        <p><Link to="/usuario">Usuario</Link></p>
      </nav>

      {/* RUTAS */}
      <Routes>

        <Route 
          path="/"  
          element={
            <Home favoritos={favoritos} setFavoritos={setFavoritos} />
          }
        />

        <Route 
          path="/home" 
          element={
            <Home favoritos={favoritos} setFavoritos={setFavoritos} />
          } 
        />

        <Route 
          path="/favoritos" 
          element={
            <Favoritos favoritos={favoritos} setFavoritos={setFavoritos} />
          }  
        />

        <Route path="/equipo/:equipo" element={<Equipo/>} />
        <Route path="/informativa" element={<Informativa/>} />
        <Route path="/original" element={<Original/>} />
        <Route path="/usuario" element={<Usuario/>} />

      </Routes>

    </Router>
  )
}

export default App