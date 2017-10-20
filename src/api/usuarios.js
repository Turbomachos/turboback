import { version } from '../../package.json';
import { Router } from 'express';
import connection from '../mysql/index';
import TurboUtils from '../utils/index';

export default ({ config, db }) => {
    let api = Router();

    /**
     *
     * @swagger
     * definition:
     *    Usuario:
     *        properties:
     *            _id:
     *                type: string
     *            username:
     *                type: string
     *            password:
     *                type: string
     *            email:
     *                type: string
     *            imagen:
     *                type: integer
     *            nombre_perfil:
     *                type: integer
     */


    /**
     * @swagger
     * /api/usuarios/usuario:
     *     get:
     *         tags:
     *             - Usuarios
     *         description: devuelve todos los usuarios de turbomachos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name: username
     *               type: string
     *             - in: query
     *               name: id_usuario
     *               type: string
     *         responses:
     *             200:
     *                 description: Un array de usuarios de turbomachos
     *                 schema:
     *                     $ref: '#/definitions/Usuario'
     */
    api.get('/usuario', (req, res) => {
        var wheres = [];
        var where = '';
        for (var atr of Object.keys(req.query)){
            if (atr == 'username' || atr == 'id_usuario'){
                wheres.push(' ' + atr + ' = "' + req.query[atr] + '" ');
            }
        }
        for(var i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('select * from usuarios' + where, (error, results, fields)=>{
            if(error){
                console.log(error);
                res.json(error);
            }
            if(results){
                console.log(results);
                res.json(results);
            }
        });
    });

    /**
     * @swagger
     * /api/usuarios/usuario:
     *     post:
     *         tags:
     *             - Usuarios
     *         description: Inserta un nuevo usuario
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Usuario
     *               schema:
     *                   type: object
     *                   properties:
     *                      username:
     *                          type: string
     *                          example: tortilla22
     *                      nombre_perfil:
     *                          type: string
     *                          example: Shurminator2000
     *                      imagen:
     *                          type: string
     *                          example: Shurminator2000
     *                      email:
     *                          type: string
     *                          example: pmus@turbomachos.com
     *                      password:
     *                          type: string
     *                          example: Patata22
     *         responses:
     *             200:
     *                 description: Devuleve el usuario creado
     *                 schema:
     *                     $ref: '#/definitions/Usuario'
     */
    api.post('/usuario', (req, res ) => {
        var aux = {};
        if (req.body.username)          aux.username = req.body.username;
        if (req.body.nombre_perfil)     aux.nombre_perfil = req.body.nombre_perfil;
        if (req.body.imagen)            aux.imagen = req.body.imagen;
        if (req.body.email)             aux.email = req.body.email;
        if (req.body.password)          aux.password = TurboUtils.generateHash(req.body.password);

        connection.query('INSERT INTO usuarios SET ? ', aux,(error, results, fields) =>{
            if(error){
                console.log(error);
                res.json(error);
            }
            if(results){
                connection.query('select * from usuarios where id_usuario = "' + results.insertId + '"' , (error, results, fields)=>{
                    if(error){
                        console.log(error);
                        res.json(error);
                    }
                    if(results){
                        console.log(results);
                        res.json(results);
                    }
                });
            }
        });
    });

    /**
     * @swagger
     * /api/usuarios/usuario:
     *     put:
     *         tags:
     *             - Usuarios
     *         description: Modifica un usuario existente
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Usuario
     *               schema:
     *                   type: object
     *                   properties:
     *                      username:
     *                          type: string
     *                          example: tortilla22
     *                      nombre_perfil:
     *                          type: string
     *                          example: Shurminator2000
     *                      imagen:
     *                          type: string
     *                          example: Shurminator2000
     *                      email:
     *                          type: string
     *                          example: pmus@turbomachos.com
     *                      password:
     *                          type: string
     *                          example: Patata22
     *                      id_usuario:
     *                          type: string
     *                          example: 1hb238hfs932gfn2183
     *         responses:
     *             200:
     *                 description: Devuleve el usuario modificado
     *                 schema:
     *                     $ref: '#/definitions/Usuario'
     */
    api.put('/usuario', (req, res ) => {
        var wheres = [];
        var where = '';
        for (var atr of Object.keys(req.body)){
            if (atr == 'username' || atr == 'nombre_perfil' || atr == 'imagen' || atr == 'email'){
                wheres.push(' ' + atr + " = '" + req.body[atr] + "' ");
            }
            if(atr == 'password'){
                wheres.push(' ' + atr + ' = "' + TurboUtils.generateHash(req.body[atr]) + '" ');
            }
        }
        for(var i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' ' + wheres[i];
            else        where += ', ' + wheres[i];
        }

        if(req.body.id_usuario){
            connection.query('UPDATE usuarios SET ' + where + ' where _id = "' + req.body.id_usuario + '" ',(error, results, fields) =>{
                if(error){
                    console.log(error);
                    res.json(error);
                }
                if(results){
                    console.log(results);
                    res.json(results);
                }
            });
        }

    });

    /**
     * @swagger
     * /api/usuarios/usuario:
     *     delete:
     *         tags:
     *             - Usuarios
     *         description: Elimina un turbousuarios de la base de datos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name : username
     *               type: string
     *             - in: query
     *               name: nombre_perfil
     *               type: string
     *             - in: query
     *               name: email
     *               type: string
     *             - in: query
     *               name: id_usuario
     *               type: string
     *
     *         responses:
     *             200:
     *                 description: Turbousuario eliminado con éxito
     *                 schema:
     *                      type: object
     *                      properties:
     *                          affectedRows:
     *                              type: integer
     *                              example: 1
     */
    api.delete('/usuario', (req, res) => {
        var wheres = [];
        var where = '';
        for (var atr of Object.keys(req.query)){
            if (atr == 'username' || atr == 'id_usuario' || atr == 'email' || atr == 'nombre_perfil'){
                wheres.push(' ' + atr + ' = "' + req.query[atr] + '" ');
            }
        }
        for(var i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('DELETE from usuarios ' + where + ' ', (error, results, fields) => {
            if(error){
                console.log(error);
                res.json(error);
            }
            if(results){
                console.log(results.affectedRows);
                res.json({affectedRows: results.affectedRows});
            }
        });
    });

    return api;
}
