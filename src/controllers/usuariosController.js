import connection from '../mysql';

let controller = {

    getUsuario : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'username' || atr == 'id_usuario'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('select * from usuarios' + where, (error, results, fields)=>{
            callback(error, results, fields);
        });
    },

    postUsuario : (obj, callback) => {
        connection.query('INSERT INTO usuarios SET ? ', obj,(error, results, fields) =>{
            callbacl(error, results, fields);
        });
    },

    putUsuario : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'username' || atr == 'nombre_perfil' || atr == 'imagen' || atr == 'email'){
                wheres.push(' ' + atr + " = '" + obj[atr] + "' ");
            }
            if(atr == 'password'){
                wheres.push(' ' + atr + ' = "' + TurboUtils.generateHash(obj[atr]) + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' ' + wheres[i];
            else        where += ', ' + wheres[i];
        }

        if(obj.id_usuario){
            connection.query('UPDATE usuarios SET ' + where + ' where id_usuario = "' + obj.id_usuario + '" ',(error, results, fields) =>{
                callback(error, results, fields);
            });
        }
    },

    deleteUsuario : (obj, callback) => {
        let wheres = [];
        let where = '';
        for (let atr of Object.keys(obj)){
            if (atr == 'username' || atr == 'id_usuario' || atr == 'email' || atr == 'nombre_perfil'){
                wheres.push(' ' + atr + ' = "' + obj[atr] + '" ');
            }
        }
        for(let i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('DELETE from usuarios ' + where + ' ', (error, results, fields) => {
            callback(error, results, fields);
        });
    }
};

export default controller;