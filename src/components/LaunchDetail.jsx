import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function LaunchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v5/launches/${id}`)
      .then(response => response.json())
      .then(data => setLaunch(data))
      .catch(error => console.error('Error fetching launch details:', error));
  }, [id]);

  if (!launch) return <p>Loading details...</p>;

  return (
    <div className="launch-detail-container">
      <button onClick={() => navigate(-1)}>⬅️ Volver</button>

      {/* 🔥 Mostrar imagen grande */}
      {launch.links.patch.large && (
        <img
          src={launch.links.patch.large}
          alt={launch.name}
          style={{ width: '300px', margin: '20px auto', display: 'block' }}
        />
      )}

      <h1>{launch.name}</h1>
      <p><strong>Fecha:</strong> {new Date(launch.date_utc).toLocaleString()}</p>
      <p><strong>Detalles:</strong> {launch.details || 'No hay descripción.'}</p>
      {launch.links.webcast && (
        <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">
          Ver video del lanzamiento
        </a>
      )}
    </div>
  );
}

export default LaunchDetail;