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
    [
        check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],
    proyectoController.crearProyecto);

router.get('/',
    auth,
    proyectoController.obtenerProyectos);

module.exports = router;