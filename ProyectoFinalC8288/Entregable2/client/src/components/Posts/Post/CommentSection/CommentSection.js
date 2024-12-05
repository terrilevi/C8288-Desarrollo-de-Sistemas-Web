/**
 Este es el componente de sección de comentarios
* 
* Propósito:
* - Muestra los comentarios existentes de un post
* - Permite a usuarios autenticados crear nuevos comentarios
* - Restringe la creación de comentarios a usuarios no autenticados
* 
*/



// Importamos las dependencias necesarias
// React y useState para manejar el estado del componente
import React, { useState } from 'react';
// Componentes de Material-UI para la interfaz
import { TextField, Button, Typography } from '@material-ui/core';
// useDispatch para despachar acciones a Redux
import { useDispatch } from 'react-redux';
// moment para formatear fechas de manera amigable
import moment from 'moment';
// Action creator para crear comentarios
import { createComment } from '../../../../actions/posts';
// Estilos personalizados definidos con makeStyles
import useStyles from './styles';

// CommentSection es un componente que recibe un post como prop
// Maneja tanto la visualización como la creación de comentarios
const CommentSection = ({ post }) => {
   // Inicializamos los hooks necesarios:
   // classes para acceder a los estilos
   const classes = useStyles();
   // dispatch para poder despachar acciones
   const dispatch = useDispatch();
   // content es el estado que guarda el texto del comentario
   const [content, setContent] = useState('');
   // Obtenemos el usuario del localStorage y lo parseamos
   const user = JSON.parse(localStorage.getItem('profile'));

   // handleSubmit maneja el envío del formulario de comentarios
   const handleSubmit = async (e) => {
       // Prevenimos el comportamiento default del formulario
       e.preventDefault();

       // Creamos el objeto comment con el contenido y nombre del usuario
       // user?.result?.name usa optional chaining para acceso seguro
       const comment = {
           content,
           name: user?.result?.name
       };

       // Despachamos la acción createComment con el ID del post y el comentario
       dispatch(createComment(post._id, comment));
       // Limpiamos el campo de texto
       setContent('');
   };

   // Renderizamos el componente
   return (
       // Container principal de comentarios
       <div className={classes.commentsOuterContainer}>
           {/* Sección que muestra los comentarios existentes */}
           <div className={classes.commentsInnerContainer}>
               <Typography variant="h6">Comments: </Typography>
               {/* Mapeamos los comentarios del post
                   post?.comments?.map usa optional chaining por si post o comments son undefined */}
               {post?.comments?.map((comment, index) => (
                   // Por cada comentario renderizamos un div
                   <div key={index} className={classes.commentItem}>
                       <div className={classes.commentHeader}>
                           {/* Nombre del autor del comentario */}
                           <Typography variant="subtitle2" className={classes.commentAuthor}>
                               {comment.name}
                           </Typography>
                           {/* Tiempo transcurrido desde la creación del comentario */}
                           <Typography variant="caption" className={classes.timeStamp}>
                               {moment(comment.createdAt).fromNow()}
                           </Typography>
                       </div>
                       {/* Contenido del comentario */}
                       <Typography variant="body2" className={classes.commentContent}>
                           {comment.content}
                       </Typography>
                   </div>
               ))}
           </div>

           {/* Formulario para crear comentarios
               Solo se muestra si hay un usuario autenticado */}
           {user?.result?.name && (
               <div className={classes.commentFormSection}>
                   <Typography variant="h6">Write a Comment</Typography>
                   <form onSubmit={handleSubmit}>
                       {/* Campo de texto para escribir el comentario */}
                       <TextField
                           fullWidth           // Ocupa todo el ancho disponible
                           minRows={3}         // Mínimo 3 filas de altura
                           variant="outlined"  // Estilo con borde
                           label="Comment"     // Etiqueta del campo
                           multiline          // Permite múltiples líneas
                           value={content}     // Controlado por el estado content
                           onChange={(e) => setContent(e.target.value)}  // Actualiza el estado
                           className={classes.commentInput}
                       />
                       {/* Botón para enviar el comentario */}
                       <Button 
                           className={classes.commentButton} 
                           fullWidth 
                           disabled={!content.trim()}  // Deshabilitado si está vacío
                           variant="contained" 
                           type="submit"
                       >
                           Comment
                       </Button>
                   </form>
               </div>
           )}
       </div>
   );
};

// Exportamos el componente
export default CommentSection;

// El flujo completo es:
// 1. El componente se monta y muestra los comentarios existentes
// 2. Usuario escribe en el TextField → setContent actualiza el estado
// 3. Usuario hace click en Comment → handleSubmit se ejecuta
// 4. handleSubmit:
//    - Crea objeto comment con contenido y nombre
//    - Despacha createComment action
//    - Limpia el campo de texto
// 5. Redux procesa la acción y actualiza el estado
// 6. El componente se re-renderiza con el nuevo comentario