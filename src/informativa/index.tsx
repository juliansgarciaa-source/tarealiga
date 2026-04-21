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

function Informativa() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((r) => r.json())
      .then((data) => { setProductos(data); setCargando(false) })
  }, [])

  const total = productos.length
  const precioPromedio = total > 0
    ? Math.round(productos.reduce((a, b) => a + b.price, 0) / total)
    : 0
  const precioMax = total > 0 ? Math.max(...productos.map((p) => p.price)) : 0
  const precioMin = total > 0 ? Math.min(...productos.map((p) => p.price)) : 0

  const porCategoria: Record<string, number> = {}
  productos.forEach((p) => {
    const cat = p.category.name
    porCategoria[cat] = (porCategoria[cat] || 0) + 1
  })

  const categorias = Object.entries(porCategoria).sort((a, b) => b[1] - a[1])
  const maxCat = categorias[0]?.[1] || 1

  const emojis: Record<string, string> = {
    clothes: '👗',
    electronics: '📱',
    furniture: '🛋️',
    shoes: '👟',
    others: '📦',
  }

  return (
    <div className="info-wrapper">
      <div className="info-header">
        <h1 className="info-title">Estadísticas <span>del Catálogo</span></h1>
        <p className="info-subtitle">Datos en tiempo real de la API</p>
      </div>

      {cargando ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando estadísticas...</p>
        </div>
      ) : (
        <>
          {/* TARJETAS STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-num">{total}</div>
              <div className="stat-label">Total productos</div>
            </div>
            <div className="stat-card accent">
              <div className="stat-icon">💰</div>
              <div className="stat-num">${precioPromedio}</div>
              <div className="stat-label">Precio promedio</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-num">${precioMax}</div>
              <div className="stat-label">Precio máximo</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📉</div>
              <div className="stat-num">${precioMin}</div>
              <div className="stat-label">Precio mínimo</div>
            </div>
          </div>

          {/* CATEGORÍAS */}
          <div className="cat-section">
            <h2 className="cat-title">Productos por categoría</h2>
            <div className="cat-list">
              {categorias.map(([cat, count]) => (
                <div key={cat} className="cat-item">
                  <div className="cat-label">
                    <span className="cat-emoji">{emojis[cat.toLowerCase()] || '🏷️'}</span>
                    <span className="cat-nombre">{cat}</span>
                    <span className="cat-count">{count}</span>
                  </div>
                  <div className="cat-bar-bg">
                    <div
                      className="cat-bar-fill"
                      style={{ width: `${(count / maxCat) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INFO API */}
          <div className="api-info">
            <h2>Sobre la API</h2>
            <p>
              Esta aplicación consume la <strong>Platzi Fake Store API</strong>, una API pública
              con productos de prueba divididos en categorías como ropa, electrónica, muebles y más.
            </p>
            <div className="api-badges">
              <span>🌐 REST API</span>
              <span>⚡ Tiempo real</span>
              <span>🆓 Gratuita</span>
              <span>📄 JSON</span>
            </div>
            <code>https://api.escuelajs.co/api/v1/products</code>
          </div>
        </>
      )}
    </div>
  )
}

export default Informativa
