const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        })
    }
    console.log(req.body);

    //extraer email y password
    const {
        email,
        password
    } = req.body;

    try {
        console.log('entra a try');

        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({
            email
        });
        console.log(password);
        console.log(usuario.password);


        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }
        console.log('llega antes de passcorrecto');

        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        console.log('llega ates de passcorrecto');

        console.log(passCorrecto);


        if (!passCorrecto) {
            return res.status(400).json({
                msg: 'Password incorrecto'
            });
        }

        // Si todo es correcto Crear y firmar el JWT (RESPONDER CON TOKEN)
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmación
            res.json({
                token
            });
        });

    } catch (error) {
        console.log(error);

    }
}