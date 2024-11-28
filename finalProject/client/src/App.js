// Este es el componente raíz de nuestra app que configura la estructura principal y el sistema de rutas

import React from 'react';
// Componentes de react-router-dom para manejar la navegación
// BrowserRouter es el proveedor principal para el enrutamiento
// Switch asegura que solo una ruta se renderice a la vez
// Route define una ruta individual y su componente asociado
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Importamos nuestros componentes
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';

const App = () => (
  // BrowserRouter envuelve toda la aplicación para habilitar el enrutamiento
  <BrowserRouter>
      {/* NavBar siempre visible, fuera del Switch */}
      <NavBar />
      {/* Switch asegura que solo una ruta se muestre a la vez*/}
      <Switch>
        {/* Ruta para la página principal:
        path="/" significa que es la ruta raíz
        exact asegura que coincida exactamente con "/"
        component={Home} indica qué componente renderizar */}
        <Route path="/" exact component={Home} />
        {/* Ruta para la página de autenticación:
        Se activa cuando la URL es /auth
        Renderiza el componente Auth */}
        <Route path="/auth" exact component={Auth} /> 
        <Route path="/profile" exact component={Profile} />
      </Switch>
  </BrowserRouter>
);
// Exportamos App como exportación por defecto para poder importarlo en index.js
export default App;



// Notitas de aprendizaje:
// Cuando navegamos a una URL:
// 1. BrowserRouter recibe la URL
// 2. Switch revisa todas sus Routes
// 3. La primera Route que coincida es la que se muestra
// 4. Las demás Routes se ignoran

// Notitas porque tuve dudas con Switch:
// Switch mira la URL actual
// Revisa todas sus Route hijas
// Permite que solo una se muestre
// 
// Sin Switch, si por ejemplo tengo estas rutas:
// /profile
// /profile/settings
// Y visito /profile/settings, React mostraría AMBAS rutas
// porque ambas coinciden parcialmente