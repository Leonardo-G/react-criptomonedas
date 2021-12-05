import React from 'react'

export const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;
    
    return (
        <div className="resultado">
            <h2>El precio es: <span>{resultado.PRICE}</span> </h2>
            <p>El precio más alto del día: <span>{resultado.HIGHDAY}</span> </p>
            <p>El precio más bajo del diá: <span>{resultado.LOWDAY}</span> </p>
            <p>Variación ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span> </p>
            <p>Última actualización: <span>{resultado.LASTUPDATE}</span> </p>
        </div>
    )
}
