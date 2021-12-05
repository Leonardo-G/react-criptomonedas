import React, { useState } from 'react';

const useMoneda = (label, stateInicial, opciones) => {

    //State de nuestro custom hooks
    const [state, setstate] = useState(stateInicial)

    const Seleccionar = () => (
        <>
            <label>{label}</label>
            <select
                onChange={ e => setstate(e.target.value)} 
                value={state}
            >
                <option value="">Seleccione</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </select>
        </>
    );

    //Retornar state, interfaz y fn que modifica el state
    return [state, Seleccionar, setstate];
}

export default useMoneda
