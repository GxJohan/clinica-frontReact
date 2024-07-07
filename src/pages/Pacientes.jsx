import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PacienteForm from '../components/PacienteForm';
import PacienteTable from '../components/PacienteTable';

const API_URL = 'http://localhost:8080/clinicadental/pacientes';

function App() {
    const [pacientes, setPacientes] = useState([]);
    const [pacienteToEdit, setPacienteToEdit] = useState(null);
    const [mensaje, setMensaje] = useState({ text: '', type: '' });

    useEffect(() => {
        cargarPacientes();
    }, []);

    const cargarPacientes = async () => {
        try {
            const response = await axios.get(API_URL);
            setPacientes(response.data);
        } catch (error) {
            console.error('Error al cargar pacientes:', error);
            mostrarMensaje('Error al cargar pacientes', 'danger');
        }
    };

    const mostrarMensaje = (text, type) => {
        setMensaje({ text, type });
        setTimeout(() => setMensaje({ text: '', type: '' }), 5000);
    };

    const handleSubmit = async (paciente) => {
        try {
            if (paciente.id) {
                await axios.put(`${API_URL}/${paciente.id}`, paciente);
                mostrarMensaje('Paciente actualizado con éxito', 'success');
            } else {
                await axios.post(API_URL, paciente);
                mostrarMensaje('Paciente creado con éxito', 'success');
            }
            cargarPacientes();
            setPacienteToEdit(null);
        } catch (error) {
            console.error('Error al guardar paciente:', error);
            mostrarMensaje('Error al guardar paciente', 'danger');
        }
    };

    const handleEdit = (paciente) => {
        setPacienteToEdit(paciente);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este paciente?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                mostrarMensaje('Paciente eliminado con éxito', 'success');
                cargarPacientes();
            } catch (error) {
                console.error('Error al eliminar paciente:', error);
                mostrarMensaje('Error al eliminar paciente', 'danger');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Gestión de Pacientes</h1>
            {mensaje.text && (
                <div className={`alert alert-${mensaje.type}`} role="alert">
                    {mensaje.text}
                </div>
            )}
            <PacienteForm onSubmit={handleSubmit} pacienteToEdit={pacienteToEdit} />
            <PacienteTable pacientes={pacientes} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}

export default App;