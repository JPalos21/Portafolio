import { useState, useEffect } from 'react';
import './App.css';
import Menu from './componentes/Menu';
import ListaJugadores from './componentes/ListaJugadores';
import servicioJugadores from './servicios/axios/servicioJugadores';
import {Routes, Route } from 'react-router-dom';
import Pagina404 from './componentes/Pagina404';
import UseStorageState from './servicios/UseStorageState';
import DetalleJugador from './componentes/DetalleJugador';
import Alineacion from './componentes/Alineacion';
import Swal from 'sweetalert2';
import { AuthProvider } from './Login/AuthProvider';
import RutasProtegidas from './Login/RutasProtegidas';
import Login from './Login/login';
import Registro from './Login/Registro';
import RutasProtegidasAdmin from './Login/RutasProtegidasAdmin';
import Admin from './componentes/Admin';
import Secreto from './componentes/Secreto';
import TodasAlineaciones from './componentes/TodasAlineaciones';
import Footer from './componentes/Footer';

const App = () => {

  const [total, setTotal] = UseStorageState("total", 0)
  const [presupuesto, setPresupuesto] = UseStorageState("presupuesto", 400) // Presupuesto para comprar
  const [productos, setProductos] = UseStorageState("productos", [])
  const [jugadores, setJugadores] = useState([]);
  const [posiciones, setPosiciones] = UseStorageState("posiciones", [])
  const [errorAdmin, setErrorAdmin] = useState('')
  const [presupuestoInicial, setPresupuestoInicial] = UseStorageState("presupuestoInicial", presupuesto)


  useEffect(() => {
    servicioJugadores.getAll()
    .then((response) => {
      setJugadores(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      Swal.fire({
        title: "Parece que hay un problema",
        text: "No se pueden cargar los jugadores loko",
        icon: "error"
      });
    });
  }, []);


  return (
  <AuthProvider>
    <div className='app-container'>
    <header>
      <Menu total={total} productos={productos} presupuesto={presupuesto} posiciones={posiciones} setPresupuesto={setPresupuesto}
      setProductos={setProductos} setTotal={setTotal} setPosiciones={setPosiciones} />

    </header>
    <main>
        <Routes>
          {/*Ruta con la lista */}
          <Route 
          path='/'
          element={<RutasProtegidas>
            <ListaJugadores jugadores={jugadores} setJugadores={setJugadores} total={total} setTotal={setTotal} 
            productos={productos} setProductos={setProductos} presupuesto={presupuesto} setPresupuesto={setPresupuesto}
            posiciones={posiciones} setPosiciones={setPosiciones} errorAdmin={errorAdmin} setErrorAdmin={setErrorAdmin}
            presupuestoInicial={presupuestoInicial} />
          </RutasProtegidas>}
          />

          <Route path='/secreto' element={ <RutasProtegidas>
            <Secreto presupuestoInicial={presupuestoInicial}  setPresupuestoInicial={setPresupuestoInicial}
            presupuesto={presupuesto} setPresupuesto={setPresupuesto} />
          </RutasProtegidas> } 
          />

          <Route path='/alineaciones' element={ <RutasProtegidas>
            <TodasAlineaciones />
          </RutasProtegidas>}>

          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />

          <Route path='/detalle-carrito' element={<RutasProtegidas>
            <Alineacion 
            productos={productos} setProductos={setProductos} total={total} setTotal={setTotal}
            posiciones={posiciones} setPosiciones={setPosiciones} presupuesto={presupuesto} setPresupuesto={setPresupuesto}
          />
          </RutasProtegidas>} />

          <Route path='/producto/:id' element={<RutasProtegidas>
            <DetalleJugador jugadores={jugadores} />
          </RutasProtegidas>} ></Route>

          <Route path='/admin' element={ <RutasProtegidasAdmin setErrorAdmin={setErrorAdmin} >
            <Admin jugadores={jugadores} setJugadores={setJugadores} />
          </RutasProtegidasAdmin> } />

          <Route path='*' element={<Pagina404 />} />

        </Routes>
        
    </main>
    <footer>
      <Footer />
    </footer>
      
    </div>
  </AuthProvider>
  );
}

export default App;
