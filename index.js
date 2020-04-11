const express = require('express');
const conectarDB = require('./config/db')
//creando el servidor
const app = express();

//Conectar a la base de datos
conectarDB();

// puerto de la app
const PORT = process.env.PORT || 4000;

app.get('/', (req,res) => {
    res.send('Hola Mundo')
})
// arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
    
})