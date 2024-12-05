/*
Este componente representa un post individual en la aplicación.
Muestra el contenido del post, incluyendo la imagen si existe, el mensaje,
el autor y la fecha de creación. También maneja las interacciones como
likes, eliminación (solo para el autor) y la posibilidad de enviar
solicitudes de amistad al autor del post.
*/

import React from 'react';
import { Card, Button } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePost, deletePost, hahaReact } from '../../../actions/posts';
import useStyles from './styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { sendFriendRequest } from '../../../actions/friends';
import funnyIcon from '../../../images/funny.png'; 
import CommentSection from './CommentSection/CommentSection';
// Creamos nuestro componente Post que recibe 'post' como prop mediante desestructuración
// La sintaxis ({ post }) es igual a escribir (props) y luego const post = props.post
const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // Obtenemos el usuario del localStorage
  // localStorage.getItem('profile') obtiene el string guardado
  // JSON.parse() convierte ese string en un objeto JavaScript, porque localStorage solo almacena strings
  const user = JSON.parse(localStorage.getItem('profile'));

  // Función que maneja el envío de solicitudes de amistad
 // Esta función será llamada cuando se haga click en el botón de agregar amigo
  const handleFriendRequest = () => {
    // Despachamos la acción sendFriendRequest pasando el ID del creador del post
    dispatch(sendFriendRequest(post.creator));
  };

  return (
    <Card className={classes.card}>
      <div className={classes.content}>
        {/* Renderizado condicional de la imagen 
           Solo se muestra si post.selectedFile existe
           La sintaxis && significa: si existe selectedFile, renderiza el div */}
        {post.selectedFile && (
          <div className={classes.imageSection}>
            {/* La imagen se muestra usando la URL base64 almacenada en selectedFile */}
            <img src={post.selectedFile} alt="post" className={classes.image} />
          </div>
        )}
        {/* Sección de detalles del post */}
        <div className={classes.details}>
          {/* Información del post (autor y timestamp) */}
          <div className={classes.postInfo}>
            <div className={classes.creatorSection}>
              {/* Nombre del creador del post */}
              <p className={classes.creator}>Posted by: {post.name}</p>
              {/* Botón de agregar amigo - solo se muestra si el usuario actual
                 no es el creador del post 
                 La sintaxis ?. (optional chaining) previene errores si user o result son null */}
              {user?.result?._id !== post?.creator && (
                <Button 
                  className={classes.friendButton}
                  onClick={handleFriendRequest}
                >
                  <PersonAddIcon fontSize="small" />
                </Button>
              )}
            </div>

             {/* Timestamp del post usando moment.js
               moment(post.createdAt) crea un objeto moment con la fecha
               fromNow() convierte esa fecha en un formato relativo como "2 hours ago" */}
            <p className={classes.timestamp}>{moment(post.createdAt).fromNow()}</p>
          </div>
          {/* Mensaje del post */}
          <p className={classes.message}>{post.message}</p>
          {/* Sección de botones (like y delete) */}
          <div className={classes.buttons}>
            {/* Botón de like 
               Al hacer click, dispatch envía la acción likePost con el ID del post */}
            <Button onClick={() => dispatch(likePost(post._id))}>
              <ThumbUpAltIcon /> 
              {/* Mostrar cantidad de likes - si no hay likes muestra 0
                 La sintaxis post?.likes?.length || 0 significa:
                 - Intenta acceder a post.likes.length
                 - Si en algún punto es null/undefined, usa 0 */}
              {post?.likes?.length || 0}
            </Button>
            
            <Button onClick={() => dispatch(hahaReact(post._id))}>
              <img 
                src={funnyIcon} 
                alt="haha" 
                className={classes.reactionIcon} 
              />
              {post?.hahaReactions?.length || 0}
            </Button>

            {/* Botón de borrar - solo visible para el creador del post
               Se renderiza solo si el ID del usuario actual coincide con el creador */}
            {(user?.result?._id === post?.creator) && (
              <Button onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon />
              </Button>
            )}
          </div>
            {/* nuevo componente YAY*/}
          <CommentSection post={post} />
        </div>
      </div>
    </Card>
  );
};
// Exportamos nuestro componente Post
export default Post;