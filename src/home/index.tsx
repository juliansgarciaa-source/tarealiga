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

interface Props {
  favoritos: Producto[]
  setFavoritos: React.Dispatch<React.SetStateAction<Producto[]>>
}

function Home({ favoritos, setFavoritos }: Props) {
  const [productos, setProductos] = useState<Producto[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('todos')
  const [detalle, setDetalle] = useState<Producto | null>(null)
  const [cargando, setCargando] = useState(true)

  const filtros = ['todos', 'clothes', 'electronics', 'furniture', 'shoes', 'others']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await res.json()
        setProductos(data)
      } catch (error) {
        console.error('Error cargando productos:', error)
      } finally {
        setCargando(false)
      }
    }
    fetchData()
  }, [])

  const productosFiltrados = productos.filter((item) => {
    const coincideBusqueda =
      busqueda.length < 3 || item.title.toLowerCase().includes(busqueda.toLowerCase())
    const coincideFiltro =
      filtro === 'todos' || item.category.name.toLowerCase().includes(filtro)
    return coincideBusqueda && coincideFiltro
  })

  const toggleFavorito = (producto: Producto) => {
    setFavoritos((prev) =>
      prev.find((f) => f.id === producto.id)
        ? prev.filter((f) => f.id !== producto.id)
        : [...prev, producto]
    )
  }

  const esFavorito = (id: number) => favoritos.some((f) => f.id === id)

  const getImagenValida = (images: string[]) => {
    const url = images?.[0]
    if (!url) return 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Sin+imagen'
    const limpia = url.replace(/[\[\]"]/g, '')
    if (limpia.startsWith('http')) return limpia
    return 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Sin+imagen'
  }

  return (
    <div className="home-wrapper">
      {/* HEADER */}
      <div className="home-header">
        <h1 className="home-title">Catálogo <span>Premium</span></h1>
        <p className="home-subtitle">{productosFiltrados.length} productos encontrados</p>
      </div>

      {/* BUSCADOR */}
      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* FILTROS */}
      <div className="filtros">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={filtro === f ? 'activo' : ''}
          >
            {f}
          </button>
        ))}
      </div>

      {/* GRID */}
      {cargando ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      ) : (
        <div className="productos-grid">
          {productosFiltrados.map((item) => (
            <div key={item.id} className="card" onClick={() => setDetalle(item)}>
              <div className="card-img-wrap">
                <img src={getImagenValida(item.images)} alt={item.title} />
                <span className="card-categoria">{item.category.name}</span>
                <button
                  className={`btn-fav ${esFavorito(item.id) ? 'activo' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorito(item) }}
                  title={esFavorito(item.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  {esFavorito(item.id) ? '♥' : '♡'}
                </button>
              </div>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p className="precio">${item.price}</p>
                <p className="desc">{item.description.substring(0, 70)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DETALLE */}
      {detalle && (
        <div className="modal-overlay" onClick={() => setDetalle(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDetalle(null)}>✕</button>
            <img src={getImagenValida(detalle.images)} alt={detalle.title} />
            <div className="modal-info">
              <span className="modal-cat">{detalle.category.name}</span>
              <h2>{detalle.title}</h2>
              <p className="modal-precio">${detalle.price}</p>
              <p className="modal-desc">{detalle.description}</p>
              <button
                className={`modal-fav-btn ${esFavorito(detalle.id) ? 'activo' : ''}`}
                onClick={() => toggleFavorito(detalle)}
              >
                {esFavorito(detalle.id) ? '♥ Quitar de favoritos' : '♡ Agregar a favoritos'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
