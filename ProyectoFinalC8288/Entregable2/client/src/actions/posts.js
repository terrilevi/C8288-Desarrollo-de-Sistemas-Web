// Importamos las constantes que definen los tipos de acciones para posts
// Cada constante representa una operación específica que modifica el estado de posts
import { FETCH_ALL, DELETE, COMMENT } from '../constants/actionTypes';

// Importamos todas las funciones de la API como un objeto nombrado 'api'
// Permite usar métodos como api.fetchPosts(), api.createPost(), etc.
import * as api from '../api/index.js';



// Sintaxis explicada:
// Es una función que retorna otra función asíncrona (thunk pattern)
// Usa desestructuración { data } para extraer la propiedad data de la respuesta
// await espera la resolución de la promesa de api.fetchPosts()
// dispatch envía una acción con type y payload al reducer

// Esta implementación consiste en:
export const getPosts = () => async (dispatch) => {
 try {
   const { data } = await api.fetchPosts();
   dispatch({ type: FETCH_ALL, payload: data });
 } catch (error) {
   console.log(error);
 }
};
// Flujo de datos:
// Se inicia en dos lugares:
// // En Home.js cuando el componente se monta
    // useEffect(() => {
    //   dispatch(getPosts());
    // }, [dispatch]);
// // En updateProfile después de cambiar el nombre
    // dispatch(getPosts());
// El action creator no recibe parámetros
// Hace una llamada GET a http://localhost:5000/posts vía api.fetchPosts()
// El backend:
  // Obtiene todos los posts de MongoDB
  // Para cada post verifica si el usuario actual ha enviado solicitudes de amistad
  // Añade hasSentRequest: true/false a cada post
// La respuesta contiene un array de posts con formato:
  // [{
  //   _id: 'postId',
  //   message: 'texto del post',
  //   name: 'nombre del creador',
  //   creator: 'userId',
  //   selectedFile: 'base64string',
  //   likes: ['userId1', 'userId2'],
  //   hahaReactions: ['userId1', 'userId3'],
  //   createdAt: Date
  // }]
// El dispatch envía estos datos al reducer posts.js
// El reducer reemplaza todo el estado actual: state = action.payload
// Los componentes Posts.js y Post.js se re-renderizan con los nuevos datos




// Sintaxis explicada:
// Recibe un parámetro post con los datos del nuevo post
// No usa desestructuración porque no necesita la respuesta
// No hace dispatch porque Socket.IO manejará la actualización
export const createPost = (post) => async (dispatch) => {
  try {
      await api.createPost(post);
  } catch (error) {
      console.log(error);
  }
};
// Flujo de datos:
// Se inicia en Form.js cuando el usuario envía el formulario:
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   dispatch(createPost({ ...postData, name: user?.result?.name }));
    //   clear();
    // };
// El action creator recibe el objeto post con:
    // message: texto del post
    // selectedFile: imagen en base64
    // name: nombre del creador
// Hace una llamada POST a http://localhost:5000/posts vía api.createPost(post)
// El backend:
  // Verifica autenticación
  // Añade campos creator y createdAt
  // Guarda el post en MongoDB
  // Emite evento Socket.IO 'newPost'
// Socket.IO en el cliente recibe el evento
// El manejador de Socket.IO:
  // Verifica si el post ya existe
  // Si no existe, hace dispatch de CREATE
  // El reducer añade el nuevo post al inicio del array



// Sintaxis explicada:
// Recibe el id del post a eliminar
// Hace dispatch inmediato sin esperar datos de respuesta
// Usa el id como payload para que el reducer sepa qué eliminar
export const deletePost = (id) => async (dispatch) => {
 try {
   // Llamada a la API:
   // 1. Envía petición de eliminación al servidor
   // 2. No necesitamos desestructurar la respuesta porque solo
   //    necesitamos saber si la eliminación fue exitosa
   await api.deletePost(id);
   // Dispatch de Acción:
   // 1. Si la eliminación fue exitosa, despacha DELETE con el id
   // 2. El reducer usará este id para eliminar el post del estado
   dispatch({ type: DELETE, payload: id });
 } catch (error) {
   console.log(error);
 }
};
// Flujo de datos:
// Se inicia en Post.js cuando el creador hace clic en eliminar:
    // <Button onClick={() => dispatch(deletePost(post._id))}>
    //   <DeleteIcon />
    // </Button>
// El action creator recibe el ID del post
// Hace una llamada DELETE a http://localhost:5000/posts/${id}
// El backend:
  // Verifica autenticación
  // Elimina el post de MongoDB
  // Envía mensaje de éxito
// El dispatch envía el ID al reducer
// El reducer filtra el post del estado:
    // posts.filter((post) => post._id !== action.payload)



// Action Creator: likePost
// Similar a createPost, no usa dispatch directo
// Depende de Socket.IO para actualizaciones
// Solo maneja errores si la llamada API falla
export const likePost = (id) => async (dispatch) => {
  try {
      await api.likePost(id);
  } catch (error) {
      console.log(error);
  }
};
// Flujo de datos:
// Se inicia en Post.js al hacer clic en el botón de like:
    // <Button onClick={() => dispatch(likePost(post._id))}>
    //   <ThumbUpAltIcon /> 
    //   {post?.likes?.length || 0}
    // </Button>
// El action creator recibe el ID del post
// Hace una llamada PATCH a http://localhost:5000/posts/${id}/likePost
// El backend:
    // Verifica autenticación
    // Si el usuario no ha dado like, lo añade
    // Si ya dio like, lo quita (toggle)
    // Emite evento Socket.IO 'postUpdate'
// Socket.IO en el cliente recibe el evento
// El manejador de Socket.IO:
    // Verifica que el post existe
    // Hace dispatch de LIKE con el post actualizado
    // El reducer actualiza el post específico con map()




// Análisis sintáctico:
// Idéntico a likePost en estructura
// Usa un endpoint diferente pero la misma lógica
// También depende de Socket.IO para actualizaciones
export const hahaReact = (id) => async (dispatch) => {
  try {
      await api.hahaReact(id);
  } catch (error) {
      console.log(error);
  }
};
// Flujo de datos:
// Se inicia en Post.js al hacer clic en el botón de haha:
    // <Button onClick={() => dispatch(hahaReact(post._id))}>
    //   <img src={funnyIcon} alt="haha" className={classes.reactionIcon} />
    //   {post?.hahaReactions?.length || 0}
    // </Button>
// El action creator recibe el ID del post
// Hace una llamada PATCH a http://localhost:5000/posts/${id}/hahaReact
// El backend:
    // Verifica autenticación
    // Toggle de la reacción haha
    // Emite evento Socket.IO 'postUpdate'
// Socket.IO en el cliente recibe el evento
// El manejador de Socket.IO:
  // Verifica que el post existe
  // Hace dispatch de LIKE (usa el mismo type)
  // El reducer actualiza el post en el estado






// Este es el action creator para crear comentarios en posts
// Se exporta para poder usarlo en otros archivos, principalmente en CommentSection.js
export const createComment = (id, comment) => async (dispatch) => {
    // Todo comienza cuando un usuario hace click en "Comment" en CommentSection.js:
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const comment = { content: "texto del usuario", name: "nombre usuario" };
    //     dispatch(createComment(post._id, comment));
    // }
    
    // Usamos try-catch porque vamos a hacer una llamada al servidor que podría fallar
    try {
        // Hacemos la petición POST al servidor usando la función commentPost de nuestra API
        // api.commentPost hace: API.post(`/posts/${id}/comment`, comment)
        // await espera a que el servidor responda
        // { data } extrae solo la propiedad data de la respuesta, que contiene el post actualizado
        const { data } = await api.commentPost(id, comment);
        
        // Una vez que tenemos la respuesta del servidor con el post actualizado,
        // usamos dispatch para enviar estos datos a Redux
        // type: COMMENT le dice al reducer qué tipo de actualización hacer
        // payload: data contiene el post completo con el nuevo comentario
        dispatch({ type: COMMENT, payload: data });
        
        // Cuando esto llega al reducer, actualiza el estado así:
        // case COMMENT:
        //     return posts.map((post) => {
        //         if (post._id === action.payload._id) {
        //             return action.payload; // post con nuevo comentario
        //         }
        //         return post;
        //     });
        
        // Después de esto:
        // 1. El estado de Redux se actualiza
        // 2. Los componentes que usan este post se re-renderizan
        // 3. El usuario ve su nuevo comentario en la interfaz

    } catch (error) {
        // Si algo falla en el proceso (servidor caído, error de red, etc.),
        // el error se captura aquí y se muestra en la consola
        console.log(error);
    }
};
// El flujo completo es:
// 1. Usuario escribe comentario y hace click en "Comment"
// 2. CommentSection.js llama a dispatch(createComment(id, comment))
// 3. createComment hace petición al servidor
// 4. Servidor guarda comentario y devuelve post actualizado
// 5. dispatch envía post actualizado a Redux
// 6. Redux actualiza el estado
// 7. React re-renderiza la UI
// 8. Usuario ve su comentario
