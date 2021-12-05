import React, { useState } from 'react';

const useCriptomonedas = (label, stateInicial, opciones) => {

    //State de nuestro custom hooks
    const [state, setstate] = useState(stateInicial)

    const SelectCripto = () => (
        <>
            <label>{label}</label>
            <select
                onChange={ e => setstate(e.target.value)} 
                value={state}
            >
                <option value="">Seleccione</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </select>
        </>
    );

    //Retornar state, interfaz y fn que modifica el state
    return [state, SelectCripto, setstate];
}

export default useCriptomonedas