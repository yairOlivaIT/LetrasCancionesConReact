import React , { Fragment , useState , useEffect } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Artista from './components/Artista';

import axios from 'axios';

function App() {

  //definir el state
  const [ busquedaletra , guardarBusquedaLetra ] = useState({});
  const [ letra , guardarLetra ] = useState('');
  const [ informacion , guardarInformacion ] = useState({});
  
  useEffect (() => {
    //si un objeto esta vacio asi lo chequeamos
    if(Object.keys(busquedaletra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista , cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      //Con esto las dos consultan en el mismo momento
      const [ letra , informacion ] = await Promise.all([
        axios(url),
        axios(url2)
      ]);
      
      guardarInformacion(informacion.data.artists[0]);
      guardarLetra(letra.data.lyrics);
    }
    consultarApiLetra();
  },[busquedaletra , informacion]);


  
  return (
    <Fragment>
      <Formulario
        guardarBusquedaLetra = { guardarBusquedaLetra }
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Artista
              informacion = {informacion}
            />
          </div>
          <div className="col-md-6">
            {/* {letra==='' ? null : este tambien se puede usar*/}
             <Cancion
                letra = {letra}
              />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
