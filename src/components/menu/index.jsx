import { useState } from 'react'
import './styles.css'
import { Link } from 'react-router-dom';

function Menu() {


  return (
    <nav className="c-menu">
    <Link to="/">Todos</Link>
    <Link to="/Éxitos">Éxitos</Link>
    <Link to="/Fallidos">Fallidos</Link>
    <Link to="/usuarios">Usuarios</Link>
    <Link to="/Favoritos">Favoritos</Link>
  </nav>
)
}

export default Menu