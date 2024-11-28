/*
Este componente muestra la lista de amigos del usuario actual.
Obtiene la lista de amigos desde el estado global y los muestra
en un formato legible. Si el usuario no tiene amigos, muestra un
mensaje apropiado.
*/

import React, { useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import { getFriends } from '../../actions/friends'; // Importamos la acción getFriends que usaremos para obtener la lista de amigos

// Definimos nuestro componente funcional FriendsList
const FriendsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends?.friendsList);
  // Utilizamos useEffect para realizar efectos secundarios. 
  // En este caso, queremos obtener la lista de amigos cuando el componente se monta. 
  useEffect(() => { // Despachamos la acción getFriends para obtener la lista de amigos desde el servidor
    dispatch(getFriends());
  }, [dispatch]); // El segundo argumento es una lista de dependencias; aquí solo depende de dispatch.

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">My friends</Typography>

      {/* Operador ternario para renderizado condicional 
          Si tenemos amigos (friends.length > 0) mapeamos la lista
          Si no, mostramos un mensaje */}

      {friends?.length > 0 ? (
        // map() nos permite iterar sobre el array de amigos y crear elementos para cada uno
        friends.map((friend) => (
          // key es necesario para que React pueda trackear elementos en listas
          <div key={friend._id} className={classes.friendItem}>
            <Typography>{friend.name}</Typography>
          </div>
        ))
      ) : (
        <Typography>I don't have friends :c, jk</Typography>
      )}
    </Paper>
  );
};

export default FriendsList;