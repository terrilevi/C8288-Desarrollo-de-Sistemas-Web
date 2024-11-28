// Este es un componente reutilizable de Input que envuelve el TextField de Material-UI
// La razón por la que creamos este componente es para tener un input personalizado
// que podamos usar en diferentes partes de nuestra aplicación manteniendo el mismo estilo

// Importamos las dependencias necesarias:

import React from 'react';
// Grid: componente de Material-UI para gestionar el layout
import { TextField, Grid } from '@material-ui/core'; // TextField: componente base de Material-UI para inputs

// Definimos nuestro componente Input como una función flecha
// que recibe un objeto con las siguientes props:
// - name: el nombre del input 
// - handleChange: la función que manejará los cambios en el input
// - label: el texto que se mostrará como etiqueta del input
// - type: el tipo de input (text, password, email, etc.)
const Input = ({ name, handleChange, label, type }) => (
   <Grid item xs={12}>
       {/* TextField es el componente principal de Material-UI para inputs
           Aquí configuramos todas sus propiedades: */}
       <TextField
           // name: identifica el campo en el formulario será usado por handleChange para saber qué campo se está modificando
           name={name}

           // onChange: evento que se dispara cuando el usuario escribe recibe la función handleChange que viene como prop
           onChange={handleChange}

           // required: hace que el campo sea obligatorio
           // mostrará un asterisco rojo
           required

           // fullWidth: hace que el input ocupe todo el ancho disponible
           // dentro de su contenedor Grid
           fullWidth

           // label: el texto que aparece encima del input
           // viene como prop y describe el propósito del campo
           label={label}

           // type: el tipo de input (text, password, email, etc.)
           // viene como prop y determina el comportamiento del input
           type={type}
       />
   </Grid>
);

// Exportamos el componente para poder utilizarlo en otros archivos
export default Input;
