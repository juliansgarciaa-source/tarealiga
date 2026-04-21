import "./style.css"
import { useState, useEffect } from 'react'

interface Producto {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: {
    name: string
  }
}

function Home() {

  const [productos, setProductos] = useState<Producto[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('todos')

  const filtros = ['todos', 'clothes', 'electronics', 'furniture', 'shoes', 'others']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products')
        const data = await res.json()
        setProductos(data)
      } catch (error) {
        console.error('Error cargando productos:', error)
      }
    }

    fetchData()
  }, [])

  const productosFiltrados = productos.filter((item) => {
    const coincideBusqueda =
      busqueda.length < 3 ||
      item.title.toLowerCase().includes(busqueda.toLowerCase())

    const coincideFiltro =
      filtro === 'todos' ||
      item.category.name.toLowerCase().includes(filtro)

    return coincideBusqueda && coincideFiltro
  })

  return (
    <>
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

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="tabla-container">
        <h2>Productos</h2>

        <div className="productos-grid">
          {productosFiltrados.map((item) => (
            <div key={item.id} className="card">

              <img src={item.images[0]} alt={item.title} />

              <h3>{item.title}</h3>

              <p><strong>Categoría:</strong> {item.category.name}</p>

              <p><strong>Precio:</strong> ${item.price}</p>

              <p className="desc">{item.description.substring(0, 80)}...</p>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home