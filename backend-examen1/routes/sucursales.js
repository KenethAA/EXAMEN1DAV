//Creacion de rutas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getSucursales, crearSucursales, actualizarSucursales, borrarSucursales } = require('../controllers/sucursales');

const router = Router();

//Ruta del get
router.get('/', getSucursales);

//Ruta del post
router.post('/', [
            check('nombre', 'Este campo es obligatorio').not().isEmpty(),
            check('usuario', 'Este campo es obligatorio').not().isEmpty(),
            validarCampos,
        ],
        crearSucursales

);

//Ruta del put
router.put('/:id', 
[
    check('nombre', 'Este campo es obligatorio').not().isEmpty(),
    check('usuario', 'Este campo es obligatorio').not().isEmpty(),
    validarCampos
],
actualizarSucursales
);

//Ruta del delete
router.delete('/:id',
borrarSucursales
);

module.exports = router;