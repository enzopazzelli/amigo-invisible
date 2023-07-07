import React, { useState } from 'react';
import Participante from './Participante';

function App() {
    const [participantes, setParticipantes] = useState([]);
    const [nombre, setNombre] = useState("");
    const [contacto, setContacto] = useState("");
    const [resultados, setResultados] = useState([]); // Nueva variable de estado para los resultados


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
        const nuevosResultados = []; // Nueva variable para los resultados de este sorteo
        for (let i = 0; i < participantes.length; i++) {
            if (participantes[i].nombre === nombresMezclados[i]) {
                const nextIndex = (i + 1) % participantes.length;
                [nombresMezclados[i], nombresMezclados[nextIndex]] = [nombresMezclados[nextIndex], nombresMezclados[i]];
            }
            //Aqui va la funcion para enviar los correos
            console.log(`Enviar correo a ${participantes[i].contacto} con el nombre ${nombresMezclados[i]}`);
            nuevosResultados.push(`A ${participantes[i].nombre} le tocó ${nombresMezclados[i]}. Se le informa a ${participantes[i].contacto}`);
        }
        setResultados(nuevosResultados); // Actualizamos el estado con los nuevos resultados
    }

    return (
        <div>
            <h1>Amigo invisible</h1>
            <h3>Agregá los participantes</h3>
            <form onSubmit={agregarParticipante}>
                <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
                <input value={contacto} onChange={e => setContacto(e.target.value)} placeholder="Contacto (Email/WhatsApp)" required />
                <button type="submit">Agregar Participante</button>
            </form>
            {participantes.map(participante => (
                <Participante key={participante.nombre} participante={participante} onDelete={eliminarParticipante} />
            ))}
                            <p>Una vez  que esten todos los participantes agregados y los datos de contacto presiona "Realizar Sorteo"</p>

            <button onClick={realizarSorteo}>Realizar Sorteo</button>

            
            {/* sección para mostrar los resultados */}
            <div>
                <h2>Resultados</h2>
                {resultados.map((resultado, i) => (
                    <p key={i}>{resultado}</p>
                ))}
            </div>
        </div>

        
    );
}

export default App;
