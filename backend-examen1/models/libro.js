//Modelo para libros
const {Schema, model, default: mongoose} = require('mongoose');

const LibrosSchema = Schema({
    nombrelibro:{
        type: String,
        required: true
    },
    imagen:{
        type: String
    },
    cantidad:{
        type: Number,
        required: true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    },
    sucursal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sucursal', 
        required: true
    },

});

LibrosSchema.method('toJSON', function(){
    const { __v, _id, ...Object } = this.toObject();
    Object.uid = _id;
    return Object;
})

module.exports = model ('Libro', LibrosSchema);