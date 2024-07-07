// src/components/DentistaTable.jsx
import React from 'react';

const DentistaTable = ({ dentistas, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Especialidad</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {dentistas.map(dentista => (
                <tr key={dentista.id}>
                    <td>{dentista.id}</td>
                    <td>{dentista.nombre}</td>
                    <td>{dentista.apellido}</td>
                    <td>{dentista.especialidad}</td>
                    <td>
                        <button onClick={() => onEdit(dentista)} className="btn btn-sm btn-warning me-2">Editar</button>
                        <button onClick={() => onDelete(dentista.id)} className="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DentistaTable;