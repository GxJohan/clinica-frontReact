// src/pages/Dentistas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DentistaForm from '../components/DentistaForm';
import DentistaTable from '../components/DentistaTable';

const API_URL = 'http://localhost:8080/clinicadental/dentistas';

function Dentistas() {
    const [dentistas, setDentistas] = useState([]);
    const [dentistaToEdit, setDentistaToEdit] = useState(null);
    const [mensaje, setMensaje] = useState({ text: '', type: '' });

    useEffect(() => {
        cargarDentistas();
    }, []);

    const cargarDentistas = async () => {
        try {
            const response = await axios.get(API_URL);
            setDentistas(response.data);
        } catch (error) {
            console.error('Error al cargar dentistas:', error);
            mostrarMensaje('Error al cargar dentistas', 'danger');
        }
    };

    const mostrarMensaje = (text, type) => {
        setMensaje({ text, type });
        setTimeout(() => setMensaje({ text: '', type: '' }), 5000);
    };

    const handleSubmit = async (dentista) => {
        try {
            if (dentista.id) {
                await axios.put(`${API_URL}/${dentista.id}`, dentista);
                mostrarMensaje('Dentista actualizado con éxito', 'success');
            } else {
                await axios.post(API_URL, dentista);
                mostrarMensaje('Dentista creado con éxito', 'success');
            }
            cargarDentistas();
            setDentistaToEdit(null);
        } catch (error) {
            console.error('Error al guardar dentista:', error);
            mostrarMensaje('Error al guardar dentista', 'danger');
        }
    };

    const handleEdit = (dentista) => {
        setDentistaToEdit(dentista);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este dentista?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                mostrarMensaje('Dentista eliminado con éxito', 'success');
                cargarDentistas();
            } catch (error) {
                console.error('Error al eliminar dentista:', error);
                mostrarMensaje('Error al eliminar dentista', 'danger');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Gestión de Dentistas</h1>
            {mensaje.text && (
                <div className={`alert alert-${mensaje.type}`} role="alert">
                    {mensaje.text}
                </div>
            )}
            <DentistaForm onSubmit={handleSubmit} dentistaToEdit={dentistaToEdit} />
            <DentistaTable dentistas={dentistas} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}

export default Dentistas;