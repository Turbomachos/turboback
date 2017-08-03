import mongoose from 'mongoose';
import miembroSchema from '../schemas/miembroSchema';

let Miembro = mongoose.model('Miembro', miembroSchema);

export default Miembro;