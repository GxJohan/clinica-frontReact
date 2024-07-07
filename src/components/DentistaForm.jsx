import React, { useState, useEffect } from 'react';

const DentistaForm = ({ onSubmit, dentistaToEdit }) => {
    const [dentista, setDentista] = useState({
        id: '',
        nombre: '',
        apellido: '',
        especialidad: ''
    });

    useEffect(() => {
        if (dentistaToEdit) {
            setDentista(dentistaToEdit);
        }
    }, [dentistaToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDentista(prevDentista => ({
            ...prevDentista,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(dentista);
        setDentista({ id: '', nombre: '', apellido: '', especialidad: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input type="hidden" name="id" value={dentista.id} />
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" name="nombre" value={dentista.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input type="text" className="form-control" id="apellido" name="apellido" value={dentista.apellido} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="especialidad" className="form-label">Especialidad</label>
                <input type="text" className="form-control" id="especialidad" name="especialidad" value={dentista.especialidad} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Guardar Dentista</button>
        </form>
    );
};
export default DentistaForm;