// src/components/CitaTable.jsx
import React from 'react';

const CitaTable = ({ citas, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Dentista</th>
                <th>Fecha y Hora</th>
                <th>Motivo</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {citas.map(cita => (
                <tr key={cita.id}>
                    <td>{cita.id}</td>
                    <td>{cita.paciente.nombre} {cita.paciente.apellido}</td>
                    <td>{cita.dentista.nombre} {cita.dentista.apellido}</td>
                    <td>{new Date(cita.fechaHora).toLocaleString()}</td>
                    <td>{cita.motivo}</td>
                    <td>
                        <button onClick={() => onEdit(cita)} className="btn btn-sm btn-warning me-2">Editar</button>
                        <button onClick={() => onDelete(cita.id)} className="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CitaTable;