/*
Este componente maneja la página de perfil del usuario donde pueden modificar su nickname.
Proporciona un formulario simple con validación que permite a los usuarios actualizar
su nombre de display. Si el usuario no está autenticado, serán redirigidos a la página
de login. Los cambios de nombre se reflejan en tiempo real en toso el app.
*/

import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { updateProfile } from '../../actions/auth';


// Definimos nuestro componente Profile
// Este componente maneja la funcionalidad de cambio de nickname del usuario
const Profile = () => {
  // Inicializamos el estado local para el usuario
  // useState recibe el valor inicial del estado:
  // JSON.parse(localStorage.getItem('profile')) convierte los datos del usuario
  // de string (como está en localStorage) a un objeto JavaScript
  const user = JSON.parse(localStorage.getItem('profile'));
  
  // Estado para el campo de nombre
  // useState(user?.result?.name || '') significa:
  // - Intenta obtener user.result.name
  // - Si en algún punto es null/undefined, usa string vacío ''
  // El operador ?. (optional chaining) evita errores si user o result son null
  const [name, setName] = useState(user?.result?.name || '');
  
  // Inicializamos hooks necesarios:
  const location = useLocation();  // Para acceder a la ubicación actual
  const classes = useStyles();     // Para nuestros estilos
  const dispatch = useDispatch();  // Para despachar acciones
  const history = useHistory();    // Para navegación programática
 
  // useEffect se ejecuta cada vez que user, history o location cambian
  // Este efecto verifica si hay un usuario logueado
  useEffect(() => {
    // Si no hay usuario, redirige a la página de autenticación
    if (!user) {
      // history.push('/auth') navega programáticamente a la ruta /auth
      history.push('/auth');
    }
  }, [user, history, location]);
 
  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    // e.preventDefault() evita que el formulario recargue la página
    e.preventDefault();
    // Despachamos la acción updateProfile con el nuevo nombre
    // La sintaxis { name } es object shorthand para { name: name }
    dispatch(updateProfile({ name }, history));
  };
 
  // Manejador para el botón de cancelar
  const handleCancel = () => {
    // Redirige al usuario a la página principal
    history.push('/');
  };
 
  // Si no hay usuario, no renderizamos nada
  if (!user) return null;
 
  // Renderizamos nuestro componente
  return (
    <Container component="main" maxWidth="xs">
      {/* Paper es un contenedor con elevación (sombra) */}
      <Paper className={classes.paper} elevation={3}>
        {/* Typography para el título */}
        <Typography variant="h5" className={classes.title}>
          Change nickname
        </Typography>
        
        {/* Formulario para cambiar el nombre
            onSubmit={handleSubmit} se ejecuta cuando se envía el formulario */}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.textField}
          />
          
          {/* Contenedor para los botones */}
          <div className={classes.buttonContainer}>
            {/* Botón de submit */}
            <Button 
              className={classes.submit} 
              variant="contained" 
              type="submit"
              fullWidth
            >
              Yes, Change
            </Button>
            
            {/* Botón de cancelar */}
            <Button 
              className={classes.cancel} 
              variant="contained"
              onClick={handleCancel}
              fullWidth
            >
              Cancel!
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
 };
 
 // Exportamos nuestro componente
 export default Profile;