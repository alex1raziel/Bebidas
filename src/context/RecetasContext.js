import React, {createContext,useState,useEffect} from 'react';
import axios from 'axios';

//Crear el context
export const RecetasContext = createContext();

// provider es donde se encuentran las funciones y state
const RecetasProvider = (props) => {

    const [recetas,guardarRecetas] = useState([]);
    const [busqueda,buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });
    const [consultar,guardarConsultar] = useState(false);

    const{nombre,categoria} = busqueda;

    useEffect(()=>{
        if(consultar){
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const resultado = await axios.get(url);
                guardarRecetas(resultado.data.drinks);
            };
            obtenerRecetas();
        }else{

        }

    },[busqueda]);
    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
};
export default RecetasProvider;
