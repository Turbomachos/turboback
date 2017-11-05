import connection from '../mysql';

let controller = {

    getUsuarioRol : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'id_rol' || atr == 'id_usuario'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('select * from usuarios_roles' + where, (error, results, fields)=>{
            callback(error, results, fields);
        });
    },

    postUsuarioRol : (obj, callback) => {
        if (obj.id_rol && obj.id_usuario){
            connection.query('INSERT INTO usuarios_roles SET ? ', aux,(error, results, fields) =>{
                callback(error, results, fields);
            });
        }
    },

    deleteUsuarioRol : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'id_usuario' || atr == 'id_rol'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('DELETE from usuarios_roles ' + where + ' ', (error, results, fields) => {
            callback(error, results, fields);

        });
    },

    getListaRoles : (id_usuario, callback) => {
        connection.query('select * from usuarios_roles where id_usuario = ' + id_usuario, (error, results, fields)=>{
            callback(error, results, fields);
        });
    }
};

export default controller;