import { useEffect, useState } from 'react';
import './Launches.css';

function Launches() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.spacexdata.com/v5/launches')
      .then(response => response.json())
      .then(data => {
        setLaunches(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching launches:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading launches...</p>;

  return (
    <div className="launches-container">
      <h1>SpaceX Launches 🚀</h1>
      {launches.map((launch) => (
        <div key={launch.id} className="launch-card">
          {launch.links.patch.small && (
            <img src={launch.links.patch.small} alt={launch.name} className="launch-image" />
          )}
          <div className="launch-details">
            <h2>{launch.name}</h2>
            <p>Fecha: {new Date(launch.date_utc).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Launches;