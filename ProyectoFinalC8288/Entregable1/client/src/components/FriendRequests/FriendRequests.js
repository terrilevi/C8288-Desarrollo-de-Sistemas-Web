/*
Este componente muestra y maneja las solicitudes de amistad pendientes.
Permite al usuario ver quién le ha enviado solicitudes de amistad y
proporciona botones para aceptar o rechazar cada solicitud. Las
actualizaciones se reflejan en tiempo real.
*/

// Importamos las dependencias necesarias:
import React, { useEffect } from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import { acceptFriendRequest, rejectFriendRequest, getFriendRequests } from '../../actions/friends';


// Definimos nuestro componente funcional FriendRequests
const FriendRequests = () => {
  // Inicializamos nuestros hooks:
  const classes = useStyles(); // para acceder a los estilos definidos en styles.js
  const dispatch = useDispatch(); // para poder despachar acciones a Redux

  // useSelector nos permite extraer datos del estado de Redux
   // state.friends?.requests: accede a las solicitudes del estado
   // si friends es null, el operador ?. evita errores 
  const requests = useSelector((state) => state.friends?.requests); // para obtener las solicitudes de amistad del estado global
  
  // useEffect se ejecuta cuando el componente se monta
  // El array [dispatch] significa que solo se ejecutará si dispatch cambia
  // (lo cual no sucede, así que solo se ejecuta una vez)

  useEffect(() => {
    // Cuando el componente se monta, despachamos la acción para obtener todas las solicitudes de amistad
    dispatch(getFriendRequests());
  }, [dispatch]);

  // Renderizamos nuestro componente:
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Make some friends!</Typography>

      {/* Operador ternario para renderizado condicional:
          Si hay solicitudes (requests.length > 0), mostrar la lista
          Si no hay solicitudes, mostrar mensaje "They coming soon :3" */}

      {requests?.length > 0 ? (
        // Mapeamos cada solicitud a elementos de la interfaz
        requests.map((request) => (
          <div key={request._id} className={classes.requestItem}>
            {/* Mostramos el nombre de quien envió la solicitud */} 
            <Typography>{request.from.name}</Typography>

            {/* Contenedor para los botones */}
            <div>

              {/* Botón de aceptar:
                  onClick despacha la acción acceptFriendRequest
                  Pasamos el ID de la solicitud como parámetro */}

              <Button 
                onClick={() => dispatch(acceptFriendRequest(request._id))}
                className={classes.acceptButton}
              >
                Accept
              </Button>


              {/* Botón de rechazar:
                similar al botón de aceptar pero despacha rejectFriendRequest*/}
              <Button 
                onClick={() => dispatch(rejectFriendRequest(request._id))}
                className={classes.rejectButton}
              >
                Not now
              </Button>
            </div>
          </div>
        ))
      ) : (
        // Mensaje que se muestra cuando no hay solicitudes
        <Typography>They coming soon :3</Typography>
      )}
    </Paper>
  );
};

export default FriendRequests; 