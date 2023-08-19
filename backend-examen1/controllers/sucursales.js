const { response } = require('express');

const Sucursal = require('../models/sucursal');


//GET - MOSTRAR
const getSucursales = async(req, res) =>{

    const sucursales = await Sucursal.find({}, 'nombre imagen usuario');

    res.status(200).json({
        ok:true,
        sucursales
    })
}

//POST - CREATE
const crearSucursales = async(req, res = response) =>{

    const {nombre, imagen, usuario } = req.body

    try {

        const existeUsuario = await Sucursal.findOne({ usuario });

        if(existeUsuario){
            return res.status(400).json({
                ok: false,
                msg: 'La sucursal ingresado ya esta Registrado!!!'
            });
        }


     const sucursal = new Sucursal( req.body );

     await sucursal.save();

     res.status(200).json({
         ok:true,
         sucursal
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
const actualizarSucursales = async (req, res = response) =>{
    
    const uid = req.params.id;

    try {

        const sucursalDB = await Sucursal.findById( uid );

        if(!sucursalDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de sucursal No EXISTE!!!!!'
            });
        }

        //Actualizar
        const { nombre, imagen, usuario, ...campos} = req.body;

        campos.nombre = nombre;
        campos.imagen = imagen;
        campos.usuario = usuario;

        const sucursalActualizado = await Sucursal.findByIdAndUpdate( uid, campos, { new: true });

        res.json({
            ok: true,
            sucursal: sucursalActualizado
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
const borrarSucursales = async(req, res = response) =>{

    const uid = req.params.id

    try {

        const sucursalDB = await Sucursal.findById( uid );

        if(!sucursalDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de sucursal No EXISTE!!!!!'
            });
        }

        await Sucursal.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Sucursal Eliminada correctamente!!!'
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
    getSucursales,
    crearSucursales,
    actualizarSucursales,
    borrarSucursales
}