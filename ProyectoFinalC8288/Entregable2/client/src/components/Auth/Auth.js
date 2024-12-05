/*
Este componente maneja tanto el registro como el inicio de sesión de usuarios.
Proporciona un formulario que alterna entre modo registro y login, con
validación de campos y manejo de errores. Después de una autenticación
exitosa, redirige al usuario a la página principal.
*/

// Importamos las dependencias
import React, { useState } from 'react';
import { Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';
import { socketService } from '../../services/socket';

// Definimos el estado inicial de nuestro formulario
// Este objeto contendrá todos los campos posibles que necesitaremos
// tanto para registro como para inicio de sesión
const initialState = { 
   firstName: '',      //  (solo para registro)
   lastName: '',       //  (solo para registro)
   email: '',         //  (para ambos modos)
   password: '',      //  (para ambos modos)
   confirmPassword: '' // (solo para registro)
};

// Definimos nuestro componente Auth como una función
const Auth = () => {
   // Inicializamos todos los hooks que necesitaremos:
   // useStyles: para aplicar los estilos de Material-UI
   const classes = useStyles();
   // isSignup: estado booleano que nos dice si estamos en modo registro (true) o inicio de sesión (false)
   const [isSignup, setIsSignup] = useState(false);
   // formData: estado que almacena todos los datos del formulario inicializado con initialState
   const [formData, setFormData] = useState(initialState);
   // dispatch: función que usaremos para despachar acciones de Redux
   const dispatch = useDispatch();
   const history = useHistory();


   
// handleSubmit es una función asíncrona que maneja el envío del formulario de autenticación
// Se define como async porque necesitaremos esperar resultados de operaciones asíncronas
const handleSubmit = async (e) => {
    e.preventDefault();
 
    // isSignup es un estado booleano que indica si estamos en modo registro
    if (isSignup) {
        // Si estamos en modo registro, despachamos la acción signup
        // dispatch(signup()) retorna una promesa por el return { data } en el action creator
        // formData contiene: { firstName, lastName, email, password, confirmPassword }
        // history es el objeto de navegación de react-router
        dispatch(signup(formData, history))
            // .then() se ejecuta cuando la promesa del signup se resuelve
            // result contiene la respuesta que retornó el action creator
            .then(result => {
                console.log('Resultado signup:', result);
                // Verificamos si tenemos el ID del usuario usando optional chaining
                // result?.data?.result?._id verifica cada nivel del objeto
                if (result?.data?.result?._id) {
                    console.log('Conectando socket con ID:', result.data.result._id);
                    // Conectamos el socket usando el ID del usuario
                    // Esto permite comunicación en tiempo real
                    socketService.connect(result.data.result._id);
                }
            });
    } else {
        // Si no estamos en modo registro, estamos en modo login
        // El proceso es similar pero usando signin
        // formData aquí solo contiene: { email, password }
        dispatch(signin(formData, history))
            .then(result => {
                // Registramos el resultado del login
                console.log('Resultado signin:', result);
        
                // Igual que en signup, verificamos el ID del usuario
                if (result?.data?.result?._id) {
                    console.log('Conectando socket con ID:', result.data.result._id);
                    // Conectamos el socket para este usuario
                    socketService.connect(result.data.result._id);
                }
            });
    }
 };
 // El flujo completo es:
 // 1. Usuario llena el formulario y hace click en submit
 // 2. handleSubmit previene el comportamiento default del formulario
 // 3. Según isSignup, despacha signup o signin
 // 4. El action creator hace la petición al servidor
 // 5. El servidor responde con los datos del usuario
 // 6. La promesa se resuelve con el resultado
 // 7. Se verifica si hay un ID de usuario
 // 8. Si hay ID, se conecta el socket para ese usuario
 // 9. El usuario queda autenticado y conectado para tiempo real
 


   // handleChange: función que se ejecuta cada vez que el usuario escribe en cualquier campo del formulario
   const handleChange = (e) => {
       // Actualizamos formData usando el spread operator para mantener
       // los valores existentes y solo actualizar el campo modificado
       // [e.target.name] es el nombre del campo (email, password, etc.)
       // e.target.value es el valor actual del campo
       setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   // switchMode: función para cambiar entre modos de registro e inicio de sesión
   const switchMode = () => {
       // Cambiamos el valor de isSignup a su opuesto
       setIsSignup((prevIsSignUp) => !prevIsSignUp);
       // Limpiamos el formulario volviendo al estado inicial
       setFormData(initialState);
   };

   // Renderizado del componente
   return (
       // Container: componente de Material-UI para centrar contenido
       <Container component="main">
           {/* Paper: componente de Material-UI que da efecto de elevación */}
           <Paper className={classes.paper} elevation={3}>
               {/* Typography: componente para texto estilizado */}
               <Typography variant="h5">
                   {isSignup ? 'Sign Up' : 'Sign In'}
               </Typography>

               {/* Formulario principal */}
               <form className={classes.form} onSubmit={handleSubmit}>
                   {/* Grid: sistema de rejilla para organizar los campos */}
                   <Grid container spacing={2}>
                       {/* Campos que solo aparecen en modo registro */}
                       {isSignup && (
                           <>
                               <Input 
                                   name="firstName" 
                                   label="First Name" 
                                   handleChange={handleChange} 
                               />
                               <Input 
                                   name="lastName" 
                                   label="Last Name" 
                                   handleChange={handleChange} 
                               />
                           </>
                       )}
                       
                       {/* Campos comunes para ambos modos */}
                       <Input 
                           name="email" 
                           label="Email" 
                           handleChange={handleChange} 
                           type="email" 
                       />
                       <Input 
                           name="password" 
                           label="Password" 
                           handleChange={handleChange} 
                           type="password"
                       />
                       
                       {/* Campo adicional solo para registro */}
                       {isSignup && 
                           <Input 
                               name="confirmPassword" 
                               label="Repeat Password" 
                               handleChange={handleChange} 
                               type="password"
                           />
                       }
                   </Grid>

                   {/* Botón principal de envío */}
                   <Button 
                       type="submit" 
                       fullWidth 
                       variant="contained" 
                       color="primary" 
                       className={classes.submit}
                   >
                       {isSignup ? "Sign Up" : "Sign In"}
                   </Button>

                   {/* Botón para cambiar entre modos */}
                   <Button onClick={switchMode}>
                       {isSignup ? 'I have an account' : "New here?"}
                   </Button>
               </form>
           </Paper>
       </Container>
   );
};

export default Auth;