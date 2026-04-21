import "./style.css"
import { useState, useEffect } from 'react'

interface Producto {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: { name: string }
}

function Original() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [actual, setActual] = useState<Producto | null>(null)
  const [girando, setGirando] = useState(false)
  const [historial, setHistorial] = useState<Producto[]>([])

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((r) => r.json())
      .then((data) => {
        setProductos(data)
        const rand = data[Math.floor(Math.random() * data.length)]
        setActual(rand)
      })
  }, [])

  const getImagenValida = (images: string[]) => {
    const url = images?.[0]
    if (!url) return 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Sin+imagen'
    const limpia = url.replace(/[\[\]"]/g, '')
    if (limpia.startsWith('http')) return limpia
    return 'https://placehold.co/400x300/1a1a2e/e0e0e0?text=Sin+imagen'
  }

  const girarRuleta = () => {
    if (girando || productos.length === 0) return
    setGirando(true)
    if (actual) setHistorial((prev) => [actual, ...prev].slice(0, 5))

    let count = 0
    const total = 15
    const interval = setInterval(() => {
      const rand = productos[Math.floor(Math.random() * productos.length)]
      setActual(rand)
      count++
      if (count >= total) {
        clearInterval(interval)
        setGirando(false)
      }
    }, 100)
  }

  return (
    <div className="original-wrapper">
      <div className="original-header">
        <h1 className="original-title">Ruleta <span>Sorpresa</span></h1>
        <p className="original-subtitle">¿Qué producto te tocará hoy?</p>
      </div>

      <div className={`ruleta-card ${girando ? 'girando' : ''}`}>
        {actual && (
          <>
            <div className="ruleta-img-wrap">
              <img src={getImagenValida(actual.images)} alt={actual.title} />
              <div className="ruleta-overlay">
                <span>{actual.category.name}</span>
              </div>
            </div>
            <div className="ruleta-info">
              <h2>{actual.title}</h2>
              <p className="ruleta-precio">${actual.price}</p>
              <p className="ruleta-desc">{actual.description.substring(0, 100)}...</p>
            </div>
          </>
        )}
      </div>

      <button
        className={`btn-girar ${girando ? 'cargando' : ''}`}
        onClick={girarRuleta}
        disabled={girando}
      >
        {girando ? (
          <><span className="spin-icon">⟳</span> Girando...</>
        ) : (
          <> ¡Girar Ruleta!</>
        )}
      </button>

      {historial.length > 0 && (
        <div className="historial">
          <h3>Últimos resultados</h3>
          <div className="historial-list">
            {historial.map((p, i) => (
              <div key={`${p.id}-${i}`} className="historial-item">
                <img src={getImagenValida(p.images)} alt={p.title} />
                <div>
                  <p className="historial-nombre">{p.title.substring(0, 30)}...</p>
                  <p className="historial-precio">${p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Original
