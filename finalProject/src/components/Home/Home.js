/*
Este es el componente principal de la página de inicio.
Organiza y estructura la interfaz principal de la aplicación,
mostrando los posts en el lado izquierdo y el formulario de
creación de posts junto con las funciones sociales (solicitudes
de amistad y lista de amigos) en el lado derecho.
*/


// Primero realizamos nuestras importaciones necesarias:
// useEffect lo necesitamos para cargar los posts cuando el componente se monte
import React, { useEffect } from 'react';

import { Container, Grow, Grid } from '@material-ui/core';

// Importamos los hooks de Redux que necesitamos
// useDispatch: para despachar la acción de cargar posts
// useSelector: para obtener el estado del usuario actual
import { useDispatch, useSelector } from 'react-redux';

// Importamos la acción getPosts que hará el fetch de los posts del backend
import { getPosts } from '../../actions/posts';

// Importamos nuestros componentes que conforman la página
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import FriendRequests from '../FriendRequests/FriendRequests';
import FriendsList from '../FriendsList/FriendsList';

// Definimos nuestro componente Home
const Home = () => {
    // Inicializamos useDispatch para poder despachar acciones
    const dispatch = useDispatch();
    
    // Obtenemos el usuario actual del estado de Redux
    const user = useSelector((state) => state.auth.authData);

    // useEffect se ejecuta cuando el componente se monta
    // Solo dependemos de dispatch ahora
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        // Grow añade una animación de entrada
        <Grow in>
            <Container>
                {/* Grid container para nuestro layout principal */}
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    {/* Sección de posts - ocupa 7/12 del ancho en pantallas sm+ */}
                    <Grid item xs={12} sm={7}>
                        <Posts />
                    </Grid>
                    
                    {/* Sección de formulario y social - ocupa 4/12 del ancho en pantallas sm+ */}
                    <Grid item xs={12} sm={4}>
                        <Form />
                        {/* Solo mostramos componentes sociales si hay usuario logueado */}
                        {user && (
                            <>
                                <FriendRequests />
                                <FriendsList />
                            </>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
