import React, { useState } from 'react';
import Participante from './Participante';

function App() {
    const [participantes, setParticipantes] = useState([]);
    const [nombre, setNombre] = useState("");
    const [contacto, setContacto] = useState("");

    // Función de Fisher-Yates para mezclar un array
    function mezclar(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // Agregar un nuevo participante
    // No permite agregar un participante si el nombre ya existe
    function agregarParticipante(e) {
        e.preventDefault();
        if (participantes.some(p => p.nombre === nombre)) {
            alert('El nombre ya existe. Por favor, introduce un nombre único.');
            return;
        }
        setParticipantes(prev => [...prev, { nombre, contacto }]);
        setNombre("");
        setContacto("");
    }

    // Eliminar un participante
    function eliminarParticipante(participanteParaEliminar) {
        setParticipantes(prev => prev.filter(participante => participante !== participanteParaEliminar));
    }

    // Realizar el sorteo
    // Mezcla los nombres y asigna cada nombre a un participante diferente
    function realizarSorteo() {
        const nombresMezclados = mezclar(participantes.map(p => p.nombre));
        for (let i = 0; i < participantes.length; i++) {
            // Si un participante obtiene su propio nombre, intercambiamos los nombres con el siguiente participante
            if (participantes[i].nombre === nombresMezclados[i]) {
                const nextIndex = (i + 1) % participantes.length;
                [nombresMezclados[i], nombresMezclados[nextIndex]] = [nombresMezclados[nextIndex], nombresMezclados[i]];
            }
            console.log(`Enviar correo a ${participantes[i].contacto} con el nombre ${nombresMezclados[i]}`);
        }
    }

    return (
        <div>
            <form onSubmit={agregarParticipante}>
                <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
                <input value={contacto} onChange={e => setContacto(e.target.value)} placeholder="Contacto (Email/WhatsApp)" required />
                <button type="submit">Agregar Participante</button>
            </form>
            {participantes.map(participante => (
                <Participante key={participante.nombre} participante={participante} onDelete={eliminarParticipante} />
            ))}
            <button onClick={realizarSorteo}>Realizar Sorteo</button>
        </div>
    );
}

export default App;
