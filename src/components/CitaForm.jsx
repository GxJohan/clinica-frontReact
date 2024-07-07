import React, { useState, useEffect } from 'react';

const CitaForm = ({ onSubmit, citaToEdit, pacientes, dentistas }) => {
    const [cita, setCita] = useState({
        id: '',
        pacienteId: '',
        dentistaId: '',
        fechaHora: '',
        motivo: ''
    });

    useEffect(() => {
        if (citaToEdit) {
            setCita({
                ...citaToEdit,
                pacienteId: citaToEdit.paciente.id,
                dentistaId: citaToEdit.dentista.id,
                fechaHora: citaToEdit.fechaHora.slice(0, 16) // Formato YYYY-MM-DDTHH:mm
            });
        }
    }, [citaToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCita(prevCita => ({
            ...prevCita,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(cita);
        setCita({ id: '', pacienteId: '', dentistaId: '', fechaHora: '', motivo: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input type="hidden" name="id" value={cita.id} />
            <div className="mb-3">
                <label htmlFor="pacienteId" className="form-label">Paciente</label>
                <select className="form-select" id="pacienteId" name="pacienteId" value={cita.pacienteId} onChange={handleChange} required>
                    <option value="">Seleccione un paciente</option>
                    {pacientes.map(paciente => (
                        <option key={paciente.id} value={paciente.id}>{paciente.nombre} {paciente.apellido}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="dentistaId" className="form-label">Dentista</label>
                <select className="form-select" id="dentistaId" name="dentistaId" value={cita.dentistaId} onChange={handleChange} required>
                    <option value="">Seleccione un dentista</option>
                    {dentistas.map(dentista => (
                        <option key={dentista.id} value={dentista.id}>{dentista.nombre} {dentista.apellido}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="fechaHora" className="form-label">Fecha y Hora</label>
                <input type="datetime-local" className="form-control" id="fechaHora" name="fechaHora" value={cita.fechaHora} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="motivo" className="form-label">Motivo</label>
                <input type="text" className="form-control" id="motivo" name="motivo" value={cita.motivo} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Guardar Cita</button>
        </form>
    );
};

export default CitaForm;