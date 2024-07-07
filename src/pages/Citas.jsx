// src/pages/Citas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitaForm from '../components/CitaForm';
import CitaTable from '../components/CitaTable';

const API_URL = 'http://localhost:8080/clinicadental';

function Citas() {
    const [citas, setCitas] = useState([]);
    const [citaToEdit, setCitaToEdit] = useState(null);
    const [mensaje, setMensaje] = useState({ text: '', type: '' });
    const [pacientes, setPacientes] = useState([]);
    const [dentistas, setDentistas] = useState([]);

    useEffect(() => {
        cargarCitas();
        cargarPacientes();
        cargarDentistas();
    }, []);

    const cargarCitas = async () => {
        try {
            const response = await axios.get(`${API_URL}/citas`);
            setCitas(response.data);
        } catch (error) {
            console.error('Error al cargar citas:', error);
            mostrarMensaje('Error al cargar citas', 'danger');
        }
    };

    const cargarPacientes = async () => {
        try {
            const response = await axios.get(`${API_URL}/pacientes`);
            setPacientes(response.data);
        } catch (error) {
            console.error('Error al cargar pacientes:', error);
        }
    };

    const cargarDentistas = async () => {
        try {
            const response = await axios.get(`${API_URL}/dentistas`);
            setDentistas(response.data);
        } catch (error) {
            console.error('Error al cargar dentistas:', error);
        }
    };

    const mostrarMensaje = (text, type) => {
        setMensaje({ text, type });
        setTimeout(() => setMensaje({ text: '', type: '' }), 5000);
    };

    const handleSubmit = async (cita) => {
        try {
            if (cita.id) {
                await axios.put(`${API_URL}/citas/${cita.id}`, cita);
                mostrarMensaje('Cita actualizada con éxito', 'success');
            } else {
                await axios.post(`${API_URL}/citas`, cita);
                mostrarMensaje('Cita creada con éxito', 'success');
            }
            cargarCitas();
            setCitaToEdit(null);
        } catch (error) {
            console.error('Error al guardar cita:', error);
            mostrarMensaje('Error al guardar cita', 'danger');
        }
    };

    const handleEdit = (cita) => {
        setCitaToEdit(cita);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar esta cita?')) {
            try {
                await axios.delete(`${API_URL}/citas/${id}`);
                mostrarMensaje('Cita eliminada con éxito', 'success');
                cargarCitas();
            } catch (error) {
                console.error('Error al eliminar cita:', error);
                mostrarMensaje('Error al eliminar cita', 'danger');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Gestión de Citas</h1>
            {mensaje.text && (
                <div className={`alert alert-${mensaje.type}`} role="alert">
                    {mensaje.text}
                </div>
            )}
            <CitaForm onSubmit={handleSubmit} citaToEdit={citaToEdit} pacientes={pacientes} dentistas={dentistas} />
            <CitaTable citas={citas} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}

export default Citas;