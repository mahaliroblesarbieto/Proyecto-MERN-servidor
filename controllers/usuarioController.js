const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            errores: errores.array()
        })
    }
    const {
        email,
        password
    } = req.body;
    try {
        //Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({
            email
        })

        //En caso ya exista un usuario registrado con ese correo mandar mensaje respectivo
        if (usuario) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
            })
        }
        //crear el nuevo usuario
        usuario = new Usuario(req.body)

        //Hashear el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        //guardar usuario
        await usuario.save()

        //Crear y firmar el jwt

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //firmar el jwt
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error
            //Mensaje de confirmacion
            // res.send('Usuario creado correctamente')
            // return res.status(400).json({msg:'Usuario creado correctamente'})
            res.json({
                token
            });
        })



    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');

    }
}