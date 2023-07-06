import React from 'react';

// El componente 'Participante' representa a cada uno de los participantes
// Recibe el participante y la función para eliminarlo como props
function Participante({ participante, onDelete }) {
    return (
        <div>
            <h2>{participante.nombre}</h2>
            <p>{participante.contacto}</p>
            <button onClick={() => onDelete(participante)}>Eliminar</button>
        </div>
    );
}

export default Participante;
