import { useEffect, useState } from 'react';
import './styles.css'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Launches() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [busqueda, setBusqueda] = useState('');
  const [selectedLaunchId, setSelectedLaunchId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let url = 'https://api.spacexdata.com/v5/launches';
    
    if (category === 'upcoming') {
      url = 'https://api.spacexdata.com/v5/launches/upcoming';
    } else if (category === 'past') {
      url = 'https://api.spacexdata.com/v5/launches/past';
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (category === 'success') {
          setLaunches(data.filter(detalle => detalle.success));
        } else if (category === 'failed') {
          setLaunches(data.filter(detalle => detalle.success === false));
        } else if (category === 'firsts') {
          const sorted = [...data].sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc));
          setLaunches(sorted.slice(0, 10));
        } else {
          setLaunches(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching launches:', error);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p>Cargando lanzamientos...</p>;

  let resultados = launches;

  if (busqueda.length >= 3) {
    resultados = launches.filter(detalle =>
      detalle.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar lanzamiento"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      /> 

      <div className="launches-container">
        <h1>SpaceX Launches 🚀</h1>

        {/* Menú de categorías */}
        <div className="menu">
  <button onClick={() => setCategory('all')}>Todos</button>
  <button onClick={() => setCategory('success')}>Éxitos</button>
  <button onClick={() => setCategory('failed')}>Fallidos</button>
  <button onClick={() => setCategory('upcoming')}>Próximos</button>
  <button onClick={() => setCategory('past')}>Pasados</button>
  <button onClick={() => setCategory('firsts')}>Primeros lanzamientos</button>
  <Link to="/usuarios">Usuarios</Link>
</div>


    

{resultados.map((detalle) => (
  <div
    key={detalle.id}
    className="detalle-card"
    onClick={() => navigate(`/detalle/${detalle.id}`)}  
    style={{ cursor: 'pointer' }}
  >
    {detalle.links.patch.small && (
      <img src={detalle.links.patch.small} alt={detalle.name} className="detalle-image" />
    )}
    <div className="detalle-details">
      <h2>{detalle.name}</h2>
      <p>Fecha: {new Date(detalle.date_utc).toLocaleDateString()}</p>
      <p>
        Estado: {detalle.success === null ? "Desconocido" : detalle.success ? "✅ Exitoso" : "❌ Fallido"}
      </p>

      {/* Mostrar más detalles si está seleccionado */}
      {selectedLaunchId === detalle.id && (
        <div className="extra-details">
          <p><strong>Flight Number:</strong> {detalle.flight_number}</p>
          <p><strong>Rocket ID:</strong> {detalle.rocket}</p>
          <p><strong>Detalles:</strong> {detalle.details ? detalle.details : "Sin descripción disponible"}</p>
          {detalle.links.webcast && (
            <a href={detalle.links.webcast} target="_blank" rel="noopener noreferrer">
              Ver lanzamiento en YouTube
            </a>
          )}
        </div>
      )}
    </div>
  </div>
))}
      </div>
    </>
  );
}

export default Launches;