import express from 'express';

const app = express();
const port = 3000;

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Ruta para renderizar la plantilla
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Este es un app de Express',
    subtitle: 'usando EJS como plantilla'
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});
