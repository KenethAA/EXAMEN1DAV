//Modelo para libros
const {Schema, model, default: mongoose} = require('mongoose');

const SucursalesSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    imagen:{
        type: String
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    }

});

SucursalesSchema.method('toJSON', function(){
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
})

module.exports = model ('Sucursal', SucursalesSchema);