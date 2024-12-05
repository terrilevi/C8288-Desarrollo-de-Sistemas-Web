/*
Este componente proporciona el formulario para crear nuevos posts.
Permite a los usuarios escribir un mensaje y adjuntar una imagen.
Solo es accesible para usuarios autenticados y maneja una pequeña validación
del formulario antes de crear un nuevo post.
*/


// Importaciones necesarias para nuestro componente Form
import React, { useState } from 'react';
import { TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
// Importamos los estilos personalizados y la acción createPost
import useStyles from './styles';
import { createPost } from '../../actions/posts';

// Definimos nuestro componente Form
const Form = () => {
  // Estado local para manejar los datos del formulario
  // postData es un objeto que contiene message y selectedFile
  // setPostData es la función que nos permite actualizar este estado
  const [postData, setPostData] = useState({ message: '', selectedFile: '' });
  // Obtenemos la función dispatch de Redux para poder despachar acciones
  const dispatch = useDispatch();
  // Aplicamos los estilos definidos en styles.js
  const classes = useStyles();
  // Obtenemos el usuario del localStorage y lo parseamos
  // Esto nos da acceso a la información del usuario logueado
  // Esto es necesario porque luego lo usaremos para que el usuario pueda postear,
  // o no pueda y le salga una cartilla
  const user = JSON.parse(localStorage.getItem('profile'));
  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Despachamos la acción createPost con los datos del post
    // Usamos spread operator (...) para mantener todos los datos existentes
    // y añadimos el nombre del usuario al post
    dispatch(createPost({ ...postData, name: user?.result?.name }));
    clear();
  };
  // Función para limpiar el formulario
  const clear = () => {
    setPostData({ message: '', selectedFile: '' });
  };
  // Si no hay usuario logueado, mostramos un mensaje particular
  // Verificamos si existe user.result.name usando encadenamiento opcional (?.)
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <p style={{ color: '#000000' }}>
          Sign in to share yourself
        </p>
      </Paper>
    );
  }
  // Si hay usuario logueado, renderizamos el formulario completo
  return (
    <Paper className={classes.paper}> {/* Efecto de elevación */}
      {/* Formulario principal */}
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        {/* Campo de texto para el mensaje */}
        <TextField 
          className={classes.textField}
          name="message" 
          variant="outlined" 
          label="Share something, please" 
          fullWidth 
          multiline 
          minRows={4} 
          value={postData.message} 
          // Actualizamos el mensaje manteniendo el resto del estado
          onChange={(e) => setPostData({ ...postData, message: e.target.value })} 
        />
        {/* Input para subir archivos */}
        <div className={classes.fileInput} >
          <FileBase 
            type="file" 
            multiple={false}  // No permitimos múltiples archivos
            // Cuando se sube un archivo, lo convertimos a base64 y actualizamos el estado
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} 
          />
        </div>
        {/* Botón para enviar el formulario */}
        <Button className={classes.buttonSubmit} variant="contained" size="large" type="submit" fullWidth>Post</Button>
        {/* Botón para limpiar el formulario */}
        <Button variant="contained" size="small" onClick={clear} fullWidth style={{ backgroundColor: '#397b7b', color: 'white' }}>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;