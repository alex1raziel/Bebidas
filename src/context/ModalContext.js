import React, {createContext,useState,useEffect} from 'react';
import axios from 'axios';

//Crear el context
export const ModalContext = createContext();

// provider es donde se encuentran las funciones y state
const ModalProvider = (props) => {

    //state del provider
    const [idreceta,guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({});

    //una vez que tengamos una receta, llamar la api
    useEffect(()=>{
        const obtenerReceta = async () =>{
            if(!idreceta)return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]);
        };
        obtenerReceta();
    },[idreceta]);

    return (
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
};
export default ModalProvider;
