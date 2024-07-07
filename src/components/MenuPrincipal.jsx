import React from 'react';
import { Link } from 'react-router-dom';

const MenuPrincipal = () => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Clínica Dental - Menú Principal</h1>
            <div className="d-grid gap-2">
                <Link to="/pacientes" className="btn btn-primary btn-lg">Gestionar Pacientes</Link>
                <Link to="/dentistas" className="btn btn-primary btn-lg">Gestionar Dentistas</Link>
                <Link to="/citas" className="btn btn-primary btn-lg">Gestionar Citas</Link>
            </div>
        </div>
    );
};

export default MenuPrincipal;