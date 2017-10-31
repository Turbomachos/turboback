import connection from '../mysql';

let controller = {

    getRol : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'id_rol' || atr == 'rol'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('select * from roles' + where, (error, results, fields)=>{
            callback(error, results, fields);
        });
    },

    postRol : (obj, callback) => {
        connection.query('INSERT INTO roles SET ? ', obj,(error, results, fields) =>{
            callback(error, results, fields);
        });
    },

    putRol : (obj, callback) => {
        let wheres = [];
        let where = '';

        for (let atr of Object.keys(obj)){
            if (atr == 'rol' || atr == 'descripcion'){
                wheres.push(' ' + atr + " = '" + obj[atr] + "' ");
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' ' + wheres[i];
            else        where += ', ' + wheres[i];
        }

        if(obj.id_rol){
            connection.query('UPDATE roles SET ' + where + ' where id_rol = "' + obj.id_rol + '" ',(error, results, fields) =>{
                callback(error, results, fields);
            });
        }
    },

    deleteRol : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'rol' || atr == 'id_rol'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('DELETE from roles ' + where + ' ', (error, results, fields) => {
            callback(error, results, fields);

        });
    }
};

export default controller;