import connection from '../mysql';

let controller = {

    getRolPermiso : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'id_rol' || atr == 'id_permiso'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('select * from roles_permisos' + where, (error, results, fields)=>{
            callback(error, results, fields);
        });
    },

    postRolPermiso : (obj, callback) => {
        if (obj.id_rol && obj.id_permiso){
            connection.query('INSERT INTO roles_permisos SET ? ', obj,(error, results, fields) =>{
                callback(error, results, fields);
            });
        }
    },

    deleteRolPermiso : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'id_permiso' || atr == 'id_rol'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('DELETE from roles_permisos ' + where + ' ', (error, results, fields) => {
            callback(error, results, fields);

        });
    }
};

export default controller;