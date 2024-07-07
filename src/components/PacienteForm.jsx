import React, { useState, useEffect } from 'react';

const PacienteForm = ({ onSubmit, pacienteToEdit }) => {
    const [paciente, setPaciente] = useState({
        id: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        telefono: ''
    });

    useEffect(() => {
        if (pacienteToEdit) {
            setPaciente(pacienteToEdit);
        }
    }, [pacienteToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaciente(prevPaciente => ({
            ...prevPaciente,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(paciente);
        setPaciente({ id: '', nombre: '', apellido: '', fechaNacimiento: '', telefono: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input type="hidden" name="id" value={paciente.id} />
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={paciente.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input type="text" className="form-control" id="apellido" name="apellido" value={paciente.apellido} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                <input type="date" className="form-control" id="fechaNacimiento" name="fechaNacimiento" value={paciente.fechaNacimiento} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input type="tel" className="form-control" id="telefono" name="telefono" value={paciente.telefono} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Guardar Paciente</button>
        </form>
    );
};

export default PacienteForm;