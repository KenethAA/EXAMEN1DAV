//Modelo para usuarios
const {Schema, model} = require('mongoose');

const UsuariosSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },

});

UsuariosSchema.method('toJSON', function(){
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
})

module.exports = model ('Usuario', UsuariosSchema);