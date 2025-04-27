import { Routes, Route } from 'react-router-dom';
import Launches from './components/Launches';
import LaunchDetail from './components/LaunchDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Launches />} />
      <Route path="/launch/:id" element={<LaunchDetail />} />
    </Routes>
  );
}

export default App;