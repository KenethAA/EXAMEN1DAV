//Creacion de rutas
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getLibros, crearLibros, actualizarLibros, borrarLibros } = require('../controllers/libros');

const router = Router();

//Ruta del get
router.get('/', getLibros);

//Ruta del post
router.post('/', [
            check('nombrelibro', 'Este campo es obligatorio').not().isEmpty(),
            check('cantidad', 'Este campo es obligatorio').not().isEmpty(),
            // check('usuario', 'Este campo es obligatorio').not().isEmpty(),
            // check('sucursal', 'Este campo es obligatorio').not().isEmpty(),
            validarCampos,
        ],
        crearLibros

);

//Ruta del put
router.put('/:id', 
[
    check('nombrelibro', 'Este campo es obligatorio').not().isEmpty(),
    check('cantidad', 'Este campo es obligatorio').not().isEmpty(),
    check('usuario', 'Este campo es obligatorio').not().isEmpty(),
    check('sucursal', 'Este campo es obligatorio').not().isEmpty(),
    validarCampos
],
actualizarLibros
);

//Ruta del delete
router.delete('/:id',
borrarLibros
);

module.exports = router;