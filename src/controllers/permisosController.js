import connection from '../mysql/index';

let controller = {

    getPermiso : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'id_permiso' || atr == 'permiso'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('select * from permisos' + where, (error, results, fields)=>{
            callback(error, results, fields);
        });
    },

    postPermiso : (obj, callback) => {
        connection.query('INSERT INTO permisos SET ? ', obj,(error, results, fields) =>{
            callback(error, results, fields);
        });
    },

    putPermiso : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'permiso' || atr == 'descripcion'){
                wheres.push(' ' + atr + " = '" + obj[atr] + "' ");
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' ' + wheres[i];
            else        where += ', ' + wheres[i];
        }

        if(obj.id_permiso){
            connection.query('UPDATE permisos SET ' + where + ' where id_permiso = "' + obj.id_permiso + '" ',(error, results, fields) =>{
                callback(error, results, fields);
            });
        }
    },

    deletePermiso : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'permiso' || atr == 'id_permiso'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('DELETE from permisos ' + where + ' ', (error, results, fields) => {
            callback(error, results, fields);
        });
    }
};

export default controller;