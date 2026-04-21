import "./style.css"

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

function Favoritos({ favoritos, setFavoritos }: Props) {
  const quitarFavorito = (id: number) => {
    setFavoritos((prev) => prev.filter((f) => f.id !== id))
  }

  const getImagenValida = (images: string[]) => {
    const url = images?.[0]
    if (!url) return 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Sin+imagen'
    const limpia = url.replace(/[\[\]"]/g, '')
    if (limpia.startsWith('http')) return limpia
    return 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Sin+imagen'
  }

  return (
    <div className="fav-wrapper">
      <div className="fav-header">
        <h1 className="fav-title">Mis <span>Favoritos</span></h1>
        <p className="fav-subtitle">
          {favoritos.length === 0
            ? 'Aún no tienes favoritos guardados'
            : `${favoritos.length} producto${favoritos.length > 1 ? 's' : ''} guardado${favoritos.length > 1 ? 's' : ''}`}
        </p>
      </div>

      {favoritos.length === 0 ? (
        <div className="fav-empty">
          <div className="fav-empty-icon">♡</div>
          <p>Explora el catálogo y guarda tus productos favoritos</p>
        </div>
      ) : (
        <div className="productos-grid">
          {favoritos.map((item) => (
            <div key={item.id} className="card">
              <div className="card-img-wrap">
                <img src={getImagenValida(item.images)} alt={item.title} />
                <span className="card-categoria">{item.category.name}</span>
                <button
                  className="btn-fav activo"
                  onClick={() => quitarFavorito(item.id)}
                  title="Quitar de favoritos"
                >
                  ♥
                </button>
              </div>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p className="precio">${item.price}</p>
                <p className="desc">{item.description.substring(0, 70)}...</p>
                <button className="btn-quitar" onClick={() => quitarFavorito(item.id)}>
                  Quitar de favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos
