// Importamos React para crear componentes
import React from 'react';

// Importamos el DataProvider que creamos para manejar el estado global
import { DataProvider } from './Data';


// Definimos App como un componente funcional de React
const App = () => {
  // El componente App retorna JSX
  return (
    // DataProvider envuelve toda la aplicación, proporciona nuestro contexto global
    <DataProvider> // FALTA COMPLETAR EL CODIGO DE MI DataProvider
      {/* Dashboard seria nuestro componente principal que mostrarìa los datos */}
      // aqui deberia estar mi dashboard (NO LLEGUÉ A TERMINARLO...)
    </DataProvider>
  );
};

// Exportamos App como el componente de este módulo
export default App;