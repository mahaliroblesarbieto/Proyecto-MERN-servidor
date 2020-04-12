const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {
    check
} = require('express-validator');

//Crea un proyecto
//api/proyectos
router.post('/',
    auth,
    // [
    //     check('email', 'Agrega un email válido').isEmail(),
    //     check('password', 'El password debe ser minimo de 6 caracteres').isLength({
    //         min: 6
    //     })
    // ],
    proyectoController.crearProyecto);

module.exports = router;