import { version } from '../../package.json';
import { Router } from 'express';
import connection from '../mysql/index';

export default ({ config, db }) => {
    let api = Router();

    /**
     * @swagger
     * definition:
     *    Usuario-Rol:
     *        properties:
     *            id_usuario:
     *                type: integer
     *            id_rol:
     *                type: integer
     */

    /**
     * @swagger
     * /api/usuariosRoles/usuarioRol:
     *     get:
     *         tags:
     *             - Permisos
     *         description: devuelve las diferentes relaciones entre roles y usuarios de turbomachos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name: id_rol
     *               type: integer
     *             - in: query
     *               name: id_usuario
     *               type: integer
     *         responses:
     *             200:
     *                 description: Un array de las diferentes relaciones entre roles y usuarios de turbomachos
     *                 schema:
     *                     $ref: '#/definitions/Usuario-Rol'
     */
    api.get('/usuarioRol', (req, res) => {
        var wheres = [];
        var where = '';
        for (var atr of Object.keys(req.query)){
            if (atr == 'id_rol' || atr == 'id_usuario'){
                wheres.push(' ' + atr + ' = "' + req.query[atr] + '" ');
            }
        }
        for(var i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('select * from usuarios_roles' + where, (error, results, fields)=>{
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
     * /api/usuariosRoles/usuarioRol:
     *     post:
     *         tags:
     *             - Permisos
     *         description: Inserta una nueva relación entre un rol y un usuario
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Usuario-Rol
     *               schema:
     *                   type: object
     *                   properties:
     *                      id_usuario:
     *                          type: integer
     *                          example: 2
     *                      id_rol:
     *                          type: integer
     *                          example: 65
     *         responses:
     *             200:
     *                 description: Devuleve la nueva relación entre un rol y un usuario
     *                 schema:
     *                     $ref: '#/definitions/Usuario-Rol'
     */
    api.post('/usuarioRol', (req, res) => {
        var aux = {};
        if (req.body.id_rol)           aux.id_rol = req.body.id_rol;
        if (req.body.id_usuario)       aux.id_usuario = req.body.id_usuario;

        if (aux.id_rol && aux.id_usuario){
            connection.query('INSERT INTO usuarios_roles SET ? ', aux,(error, results, fields) =>{
                if(error){
                    console.log(error);
                    res.json(error);
                }
                if(results){
                    connection.query('select * from usuarios_roles where id_rol = "' + aux.id_rol + '" and id_usuario = "' +  aux.id_usuario + '"' , (error, results, fields)=>{
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
        }
    });

    /**
     * @swagger
     * /api/usuariosRoles/usuarioRol:
     *     delete:
     *         tags:
     *             - Permisos
     *         description: Elimina una relación entre un rol y un usuario de la base de datos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name : id_usuario
     *               type: integer
     *             - in: query
     *               name: id_rol
     *               type: integer
     *
     *         responses:
     *             200:
     *                 description: Relación entre un rol y un usuario eliminado con éxito
     *                 schema:
     *                      type: object
     *                      properties:
     *                          affectedRows:
     *                              type: integer
     *                              example: 1
     */
    api.delete('/usuarioRol', (req, res) => {
        var wheres = [];
        var where = '';
        for (var atr of Object.keys(req.query)){
            if (atr == 'id_usuario' || atr == 'id_rol'){
                wheres.push(' ' + atr + ' = "' + req.query[atr] + '" ');
            }
        }
        for(var i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('DELETE from usuarios_roles ' + where + ' ', (error, results, fields) => {
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