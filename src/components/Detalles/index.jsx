import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function LaunchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detalle, setLaunch] = useState(null);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v5/launches/${id}`)
      .then(response => response.json())
      .then(data => setLaunch(data))
      .catch(error => console.error('Error fetching detalle details:', error));
  }, [id]);

  if (!detalle) return <p>Loading details...</p>;

  return (
    <div className="detalle-detail-container">
      <button onClick={() => navigate(-1)}>⬅️ Volver</button>

      {/* 🔥 Mostrar imagen grande */}
      {detalle.links.patch.large && (
        <img
          src={detalle.links.patch.large}
          alt={detalle.name}
          style={{ width: '300px', margin: '20px auto', display: 'block' }}
        />
      )}

      <h1>{detalle.name}</h1>
      <p><strong>Fecha:</strong> {new Date(detalle.date_utc).toLocaleString()}</p>
      <p><strong>Detalles:</strong> {detalle.details || 'No hay descripción.'}</p>
      {detalle.links.webcast && (
        <a href={detalle.links.webcast} target="_blank" rel="noopener noreferrer">
          Ver video del lanzamiento
        </a>
      )}
    </div>
  );
}

export default LaunchDetail;