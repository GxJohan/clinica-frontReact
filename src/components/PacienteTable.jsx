import React from 'react';

const PacienteTable = ({ pacientes, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de Nacimiento</th>
                <th>Teléfono</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {pacientes.map(paciente => (
                <tr key={paciente.id}>
                    <td>{paciente.id}</td>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.apellido}</td>
                    <td>{paciente.fechaNacimiento}</td>
                    <td>{paciente.telefono}</td>
                    <td>
                        <button onClick={() => onEdit(paciente)} className="btn btn-sm btn-warning me-2">Editar</button>
                        <button onClick={() => onDelete(paciente.id)} className="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PacienteTable;