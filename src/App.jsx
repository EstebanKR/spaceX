import { useEffect, useState } from 'react'


import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Launches from './components/Launches';
import LaunchDetail from './components/Detalles';
import { AppProvider } from './Contexto/Contexto';
import { supabase } from './supabase';
import Login from './components/Login';
import Registro from './components/registro';
import Administrador from './components/administrador';
import Menu from './components/menu';
import Usuario from './components/Usuario';

function App() {
  
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    async function verificarSesion() {

      const { data: { session } } = await supabase.auth.getSession();

      setUsuario(session?.user || null);

      setCargando(false);

    }
    verificarSesion();

    supabase.auth.onAuthStateChange((event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;
  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}
        <Routes>
          <Route path="/" element={usuario ? <Launches /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={usuario ? <Usuario /> : <Navigate to="/login" />} />
          <Route path="/detalle/:id" element={usuario ? <LaunchDetail /> : <Navigate to="/login" />} />
          <Route path="/launches" element={usuario ? <Launches /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/administrador" element={usuario ? <Administrador /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
export default App;