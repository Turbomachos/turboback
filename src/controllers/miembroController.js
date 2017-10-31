import Miembro from '../models/miembroModel';

let controller = {

    getMiembro : (obj, callback) =>{
        Miembro.find(obj, (error, resultado) => {
            callback(error, resultado);
        });
    },

    postMiembro : (obj, callback) => {
        let miembro = new Miembro(obj);
        miembro.save((error, miembro) => {
            callback(error, miembro);
        });
    },

    putMiembro : (obj, callback) => {
        Miembro.findById(obj._id, (error, miembro) => {
            if (error) callback({error:'errooooor'});
            else {
                let aux = new Miembro(miembro);
                aux.set(obj);
                aux.save((error, miembro) => {
                    callback(error, miembro);
                });
            }
        });
    },

    deleteMiembro : (obj, callback) => {
        Miembro.remove(obj, (error, miembro) => {
            callback(error, miembro);
        });
    }
};

export default controller;