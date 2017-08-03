import mongoose from 'mongoose';

let miembroSchema = mongoose.Schema({
    id_usuario: String,
    imagen: String,
    nombre: String,
    biografia: String,
    fecha_union: Number,
    fecha_salida: Number
});
export default miembroSchema;