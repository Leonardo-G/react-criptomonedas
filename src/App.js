import React, { useEffect, useState } from 'react';
import { Formulario } from './components/Formulario';
import imgCripto from "./cryptomonedas.png";
import axios from "axios"
import { Cotizacion } from './components/Cotizacion';
import { Spinner } from './components/Spinner';

export const App = () => {

  const [moneda, setMoneda] = useState("");
  const [criptoMoneda, setCriptoMoneda] = useState("");
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect( () => {
    const cotizarCriptomoneda = async () => {
      //Evitamos la ejecución la primera vez
      if(moneda === "") return;
      console.log("cotizando..");

      //Consultar api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
      
      //Mostrar el spinner
      setCargando(true);

      const resultado = await axios.get(url)
      setResultado(resultado.data.DISPLAY[criptoMoneda][moneda])
      setCargando(false)
    }
    cotizarCriptomoneda()
  }, [moneda, criptoMoneda])

  //Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>

  return (
    <div className="container">
      <div>
        <img className="imgIzq" src={imgCripto} alt="criptomonedas"/>
      </div>
      <div>
        <h1 className="heading">Cotiza Criptomedas al instante</h1> 
        <Formulario setMoneda={setMoneda} setCriptoMoneda={setCriptoMoneda} />
        {componente} 
      </div>
    </div>
  )
}

