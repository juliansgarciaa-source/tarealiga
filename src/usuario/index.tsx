import "./style.css"
import julian from "../assets/JULIAN.jpg"

function Usuario() {
  return (
    <div className="usuario-wrapper">
      <div className="usuario-header">
        <img src={julian} alt="Julián" className="usuario-foto" />
        <h1 className="usuario-nombre">Julián <span>Papasito Rico</span> 😎</h1>
        <p className="usuario-rol">profe me merezco un 5 y lo sabe le conviene porque yo se cositas</p>
      </div>
    </div>
  )
}

export default Usuario