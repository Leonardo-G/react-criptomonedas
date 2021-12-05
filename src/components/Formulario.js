import React, { useEffect, useState } from 'react'
import {Error} from "./Error" 
import useCriptomonedas from '../Hooks/useCriptomendas';
import useMoneda from '../Hooks/useMoneda';
import axios from "axios"

export const Formulario = ({setMoneda, setCriptoMoneda}) => {

    //State del listado de criptomonedas
    const [ listacripto, guardarListaCripto ] = useState([]);
    const [error, setError] = useState(false)

    const MONEDAS = [
        {codigo: "USD", nombre: "Dolar de Estados Unidos"},
        {codigo: "MXN", nombre: "Peso Mexicano"},
        {codigo: "EUR", nombre: "Euro"},
        {codigo: "LIB", nombre: "Libra Esterlina"},
    ]

    //Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda("Elige tu moneda", "", MONEDAS);
    const [consultandoApi] = useState(true)

    //Utilizar useCriptomoneda
    const [ criptomonedas, SelectCripto ] = useCriptomonedas("Elige tu Criptomoneda", "", listacripto);

    const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

        const resultado = await axios.get(url)
        guardarListaCripto(resultado.data.Data);
    }

    useEffect( () => {
        consultarAPI()
        //Solo se va a ejecutar una vez, ya que la dependencia no va a cambiar.
    }, [consultandoApi])
    
    //Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault()

        //Validar si ambos campos estan llenos
        if(moneda === "" || criptomonedas === ""){
            setError(true)
            return;
        }

        //Pasar los datos al componente principal
        setError(false);
        setMoneda(moneda);
        setCriptoMoneda(criptomonedas)

    }

    return (
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje="Todos los campos obligatorios"/> : null}
            <SelectMonedas />
            <SelectCripto />
            <button className="btn">Calcular</button>
        </form>
    )
}
