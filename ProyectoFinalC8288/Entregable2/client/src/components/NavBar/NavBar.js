/*
Este componente representa la barra de navegación principal de la aplicación.
Muestra el logo, maneja la autenticación del usuario mostrando su avatar y nombre
cuando está logueado, o un botón de login cuando no lo está. También se encarga
de verificar la expiración del token JWT y realizar el logout automático cuando
sea necesario.
*/

import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { socketService } from '../../services/socket';


// Definimos nuestro componente NavBar
const NavBar = () => {
    // Inicializamos todos nuestros hooks:
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    // location nos da información sobre la ruta actual
    const location = useLocation();
    // Obtenmos el usuario del estado global de Redux
    // state.auth.authData es la ruta donde guardamos los datos del usuario
    // cuando se loguea exitosamente
    const user = useSelector((state) => state.auth.authData);
  
    // Definimos nuestra función de logout
    const logout = () => {
      console.log('Iniciando proceso de logout...');
      socketService.disconnect();
      dispatch({ type: 'LOGOUT' });
      history.push('/');
      console.log('Proceso de logout completado');
    };
  
    // useEffect para verificar la expiración del token
    // Se ejecuta cada vez que location o user cambian
    useEffect(() => {
      // Intentamos obtener el token del usuario
      // user?.token usa optional chaining para evitar errores si user es null
      const token = user?.token;
      
      // Si existe un token, verificamos su expiración
      if (token) {
        // Decodificamos el token para acceder a su payload
        const decodedToken = decode(token);
        
        // Verificamos si el token ha expirado
        // decodedToken.exp está en segundos, por eso multiplicamos por 1000
        // new Date().getTime() nos da el tiempo actual en millisegundos
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          // Si el token expiró, hacemos logout
          logout();
        }
      }
    }, [location, user]);
  
    // Renderizamos nuestra navbar
    return (
      // AppBar es nuestro contenedor principal
      <AppBar className={classes.appBar} position="static">
        {/* Contenedor para el logo */}
        <div className={classes.brandContainer}>
          <Link to="/">
            <img className={classes.image} src={memories} alt="icon" />
          </Link>
        </div>
        
        {/* Toolbar contendrá nuestros elementos de autenticación */}
        <Toolbar className={classes.toolbar}>
          {/* Renderizado condicional basado en si existe un usuario */}
          {user ? (
            // Si hay usuario, mostramos su perfil y botón de logout
            <div className={classes.profile}>
              {/* Botón que lleva al perfil del usuario */}

              <Button
                component={Link}
                to="/profile"
                className={classes.profileButton}
              >
                {/* Avatar muestra la inicial del nombre del usuario */}
                <Avatar className={classes.purple} alt={user.result.name}>
                  {/* charAt(0) obtiene el primer carácter del nombre */}
                  {user.result.name.charAt(0)}
                </Avatar>
                
                {/* Mostramos el nombre completo del usuario */}
                <Typography className={classes.userName} variant="h6">
                  {user.result.name}
                </Typography>
              </Button>
              
              {/* Botón de logout */}
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            // Si no hay usuario, mostramos el botón de Sign In
            <Button component={Link} to="/auth" variant="contained" color="primary">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  };
  
  // Exportamos nuestro componente para poder importarlo en otros archivos
  export default NavBar;