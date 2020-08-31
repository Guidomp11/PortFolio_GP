const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');


module.exports = [
    check('nombre')
        .not()
        .isEmpty()
        .withMessage('Ingresar un nombre'),
    check('apellido')
        .not()
        .isEmpty()
        .withMessage('Ingresar un apellido'),
    check('email')
        .isEmail()
        .withMessage('Ingresar un email válido'),
    check('contrasenia')
        .isLength({min: 8})
        .withMessage('La contrasenia deberia tener un minimo de 8 caracteres'),
    body('email')
        .custom(async function(emailIngresado){
            let emailValido = await db.Usuario.findOne({
                where: {
                    email: emailIngresado
                }
            })
            .then(function(resultado){
                if(resultado){
                    throw Error('Este mail ya está registrado');
                }else{
                    return true;
                }
            })
            return emailValido;
        }).withMessage('Este email ya esta registrado')
]