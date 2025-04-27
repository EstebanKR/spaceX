import { useEffect, useState } from 'react';
import './Launches.css';
import { useNavigate } from 'react-router-dom';

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
          setLaunches(data.filter(launch => launch.success));
        } else if (category === 'failed') {
          setLaunches(data.filter(launch => launch.success === false));
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

  // 🔥 Buscar sobre los lanzamientos
  let resultados = launches;

  if (busqueda.length >= 3) {
    resultados = launches.filter(launch =>
      launch.name.toLowerCase().includes(busqueda.toLowerCase())
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
        </div>

    

{resultados.map((launch) => (
  <div
    key={launch.id}
    className="launch-card"
    onClick={() => navigate(`/launch/${launch.id}`)}  // 🔥 Aquí
    style={{ cursor: 'pointer' }}
  >
    {launch.links.patch.small && (
      <img src={launch.links.patch.small} alt={launch.name} className="launch-image" />
    )}
    <div className="launch-details">
      <h2>{launch.name}</h2>
      <p>Fecha: {new Date(launch.date_utc).toLocaleDateString()}</p>
      <p>
        Estado: {launch.success === null ? "Desconocido" : launch.success ? "✅ Exitoso" : "❌ Fallido"}
      </p>

      {/* Mostrar más detalles si está seleccionado */}
      {selectedLaunchId === launch.id && (
        <div className="extra-details">
          <p><strong>Flight Number:</strong> {launch.flight_number}</p>
          <p><strong>Rocket ID:</strong> {launch.rocket}</p>
          <p><strong>Detalles:</strong> {launch.details ? launch.details : "Sin descripción disponible"}</p>
          {launch.links.webcast && (
            <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">
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