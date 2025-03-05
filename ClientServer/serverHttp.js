const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Habilitar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Base de datos en memoria
const database = [];

// Ruta para manejar POST requests (guardar datos)
app.post('/data', (req, res) => {
  console.log('Datos recibidos:', req.body);
  
  // Asignar un ID único
  const newData = { id: database.length + 1, ...req.body };
  database.push(newData);

  res.json({
    status: 'Datos recibidos!',
    receivedData: newData
  });
});

// Ruta para manejar GET requests (obtener datos)
app.get('/data', (req, res) => {
  res.json(database);
});

// Ruta para manejar PUT requests (actualizar datos)
app.put('/data/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedData = req.body;

  // Buscar usuario por ID
  const userIndex = database.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Actualizar datos del usuario
  database[userIndex] = { ...database[userIndex], ...updatedData };

  res.json({
    status: 'Datos actualizados!',
    updatedData: database[userIndex]
  });
});

// Ruta para manejar DELETE requests (eliminar datos)
app.delete('/data/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Buscar usuario por ID
  const userIndex = database.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Eliminar usuario
  const deletedUser = database.splice(userIndex, 1);

  res.json({
    status: 'Usuario eliminado!',
    deletedData: deletedUser[0]
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
