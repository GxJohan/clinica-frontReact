import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MenuPrincipal from './components/MenuPrincipal';
import Pacientes from './pages/Pacientes';
import Dentistas from './pages/Dentistas';
import Citas from './pages/Citas';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Clínica Dental</Link>
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/">Inicio</Link>
                            <Link className="nav-link" to="/pacientes">Pacientes</Link>
                            <Link className="nav-link" to="/dentistas">Dentistas</Link>
                            <Link className="nav-link" to="/citas">Citas</Link>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<MenuPrincipal />} />
                    <Route path="/pacientes" element={<Pacientes />} />
                    <Route path="/dentistas" element={<Dentistas />} />
                    <Route path="/citas" element={<Citas />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;