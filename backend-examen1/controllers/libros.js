const { response } = require('express');

const Libro = require('../models/libro');


//GET - MOSTRAR
const getLibros = async(req, res) =>{

    const libros = await Libro.find({}, 'nombrelibro imagen cantidad usuario sucursal');

    res.status(200).json({
        ok:true,
        libros
    })
}

//POST - CREATE
const crearLibros = async(req, res = response) =>{

    const {nombrelibro, cantidad, usuario, sucursal } = req.body

    try {

        const existeUsuario = await Libro.findOne({ usuario });

        if(existeUsuario){
            return res.status(400).json({
                ok: false,
                msg: 'El libro ingresado ya esta Registrado!!!'
            });
        }


     const libro = new Libro( req.body );

     await libro.save();

     res.status(200).json({
        ok:true,
        libro
     });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al insertar datos!!!'
        })
    }
}

//PUT - ACTUALIZAR
const actualizarLibros = async (req, res = response) =>{
    
    const uid = req.params.id;

    try {

        const libroDB = await Libro.findById( uid );

        if(!libroDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de libro No EXISTE!!!!!'
            });
        }

        //Actualizar
        const { nombrelibro, cantidad, usuario, sucursal, ...campos} = req.body;

        campos.nombrelibro = nombrelibro;
        campos.cantidad = cantidad;
        campos.usuario = usuario;
        campos.sucursal = sucursal;

        const libroActualizado = await Libro.findByIdAndUpdate( uid, campos, { new: true });

        res.json({
            ok: true,
            libro: libroActualizado
        });


    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        })
    }
}

//DELETE - Borrar
const borrarLibros = async(req, res = response) =>{

    const uid = req.params.id

    try {

        const libroDB = await Libro.findById( uid );

        if(!libroDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de libro No EXISTE!!!!!'
            });
        }

        await Libro.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Libro Eliminado correctamente!!!'
        });

}catch(error){

    console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar registro!!!'
        })
    }
}

module.exports = {
    getLibros,
    crearLibros,
    actualizarLibros,
    borrarLibros
}