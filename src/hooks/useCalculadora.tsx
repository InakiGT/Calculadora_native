import { useRef, useState } from "react";

enum Operadores { // Enumeración de typescript
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
   
    
    const [ numeroAnterior, setNumeroAnterior ] = useState('0');
    const [ numero, setNumero ] = useState('100');

    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = ( numeroTexto: string ) => {

        // No aceptar doble punto
        if( numero.includes('.') && numeroTexto === '.' ) return;

        if( numero.startsWith('0') || numero.startsWith('-0') ) {

            // Punto decimal
            if( numeroTexto === '.' ) {
                setNumero( numero + numeroTexto );

            // Evaluar si es otro 0 y hay un punto
            } else if( numeroTexto === '0' && numero.includes('.')) {
                setNumero( numero + numeroTexto );
            
            // Evaluar si es diferente de 0 y no tiene un punto
            } else if( numeroTexto >= '0' && !numero.includes('.') ) {
                setNumero( numeroTexto );

            // Evitar el 0000.0
            } else if( numeroTexto === '0' && !numero.includes('.') ) {
                setNumero( numero );
            } else {
                setNumero( numero + numeroTexto )
            }

        } else {
            setNumero( numero + numeroTexto );
        }


    }

    const toogle = () => {

        if( numero.includes('-') ) {
            setNumero( numero.replace('-', '') );
        } else {
            setNumero( '-' + numero );
        }

    }

    const btnDel = () => {

        let negativo = '';
        let numeroTemp = numero;
        // Si es negativo
        if( numero.includes('-') ) {
            negativo = '-';
            numeroTemp = numero.substring(1); // Elimina el primer valor del string, en este caso el -
        }

        if( numeroTemp.length > 1 ) {
            setNumero( negativo + numeroTemp.slice(0, -1) ); // Quita la última posición
        } else {
            setNumero('0');
        }

    }

    const cambiarNumPorAnterior = () => {
        if(numero.endsWith('.')) {
            setNumeroAnterior(numero.slice(0, -1));
        } else {
            setNumeroAnterior( numero )
        }
        setNumero('0');

    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }

    const calcular = () => {

        const num1 = Number( numero ); // Transforma el string a un número
        const num2 = Number( numeroAnterior );

        switch ( ultimaOperacion.current ) {
            case Operadores.sumar:
                setNumero( `${num1 + num2}` );
                break;
            case Operadores.restar:
                setNumero( `${num2 - num1}` );
                break;
            case Operadores.multiplicar:
                setNumero( `${num1 * num2}` );
                break;
            case Operadores.dividir:
                if( num1 === 0 ) return;
                setNumero( `${num2 / num1}` );
                break;
        }
        setNumeroAnterior('0');

    }

    return {
        numeroAnterior,
        numero,
        limpiar,
        armarNumero,
        toogle,
        btnDel,
        btnDividir,
        btnMultiplicar,
        btnSumar,
        btnRestar,
        calcular
    }

}
