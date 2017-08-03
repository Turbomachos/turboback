import mongoose from 'mongoose';
import miembroSchema from '../Schemas/miembroSchema';

let Miembro = mongoose.model('Miembro', miembroSchema);

export default Miembro;