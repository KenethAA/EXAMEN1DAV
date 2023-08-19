const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');


//GET - MOSTRAR
const getUsuarios = async(req, res) =>{

    const usuarios = await Usuario.find({}, 'nombre email password img role ');

    res.status(200).json({
        ok:true,
        usuarios
    })
}

//POST - CREATE
const crearUsuario = async(req, res = response) =>{

    const {email, password, nombre } = req.body

    try {

        const existeEmail = await Usuario.findOne({ email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El Email ingresado ya esta Registrado!!!'
            });
        }


     const usuario = new Usuario( req.body );

     //Encriptacion de contraseña
     const salt = bcrypt.genSaltSync();
     usuario.password = bcrypt.hashSync( password, salt );

     //Guardar usuario con la contraseña encriptada
     await usuario.save();

     res.status(200).json({
         ok:true,
         usuario
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
const actualizarUsuario = async (req, res = response) =>{
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de usuario No EXISTE!!!!!'
            });
        }

        //Actualizar
        const { password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){

            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Se encuentra un usuario con ese Email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
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
const borrarUsuario = async(req, res = response) =>{

    const uid = req.params.id

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'El id de usuario No EXISTE!!!!!'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario Eliminado correctamente!!!'
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}