import { version } from '../../package.json';
import { Router } from 'express';
import connection from '../mysql/index';

export default ({ config, db }) => {
    let api = Router();

    /**
     * @swagger
     * definition:
     *    Rol:
     *        properties:
     *            id_rol:
     *                type: integer
     *            rol:
     *                type: string
     *            descripcion:
     *                type: string
     */

    /**
     * @swagger
     * /api/roles/rol:
     *     get:
     *         tags:
     *             - Permisos
     *         description: devuelve los diferentes roles de turbomachos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name: id_rol
     *               type: integer
     *             - in: query
     *               name: rol
     *               type: string
     *         responses:
     *             200:
     *                 description: Un array de los permisos de turbomachos
     *                 schema:
     *                     $ref: '#/definitions/Rol'
     */
    api.get('/rol', (req, res) => {
        var wheres = [];
        var where = '';
        for (var atr of Object.keys(req.query)){
            if (atr == 'id_rol' || atr == 'rol'){
                wheres.push(' ' + atr + ' = "' + req.query[atr] + '" ');
            }
        }
        for(var i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('select * from roles' + where, (error, results, fields)=>{
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
     * /api/roles/rol:
     *     post:
     *         tags:
     *             - Permisos
     *         description: Inserta un nuevo rol
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Rol
     *               schema:
     *                   type: object
     *                   properties:
     *                      rol:
     *                          type: string
     *                          example: tortilla22
     *                      descripcion:
     *                          type: string
     *                          example: Shurminator2000
     *         responses:
     *             200:
     *                 description: Devuleve el rol creado
     *                 schema:
     *                     $ref: '#/definitions/Rol'
     */
    api.post('/rol', (req, res) => {
        var aux = {};
        if (req.body.rol)               aux.rol = req.body.rol;
        if (req.body.descripcion)       aux.descripcion = req.body.descripcion;

        connection.query('INSERT INTO roles SET ? ', aux,(error, results, fields) =>{
            if(error){
                console.log(error);
                res.json(error);
            }
            if(results){
                connection.query('select * from roles where id_rol = "' + results.insertId + '"' , (error, results, fields)=>{
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
     * /api/roles/rol:
     *     put:
     *         tags:
     *             - Permisos
     *         description: Modifica un rol existente
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Rol
     *               schema:
     *                   type: object
     *                   properties:
     *                      id_rol:
     *                          type: integer
     *                          example: 15
     *                      rol:
     *                          type: string
     *                          example: Shur0
     *                      descripcion:
     *                          type: string
     *                          example: Shurminator2000
     *         responses:
     *             200:
     *                 description: Devuleve el rol modificado
     *                 schema:
     *                      type: object
     *                      properties:
     *                          affectedRows:
     *                              type: integer
     *                              example: 1
     */
    api.put('/rol', (req, res) => {
        var wheres = [];
        var where = '';
        for (var atr of Object.keys(req.body)){
            if (atr == 'rol' || atr == 'descripcion'){
                wheres.push(' ' + atr + " = '" + req.body[atr] + "' ");
            }
        }
        for(var i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' ' + wheres[i];
            else        where += ', ' + wheres[i];
        }

        if(req.body.id_rol){
            connection.query('UPDATE roles SET ' + where + ' where id_rol = "' + req.body.id_rol + '" ',(error, results, fields) =>{
                if(error){
                    console.log(error);
                    res.json(error);
                }
                if(results){
                    console.log(results.affectedRows);
                    res.json({affectedRows: results.affectedRows});
                }
            });
        }
    });

    /**
     * @swagger
     * /api/roles/rol:
     *     delete:
     *         tags:
     *             - Permisos
     *         description: Elimina un rol de la base de datos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name : id_rol
     *               type: string
     *             - in: query
     *               name: rol
     *               type: string
     *
     *         responses:
     *             200:
     *                 description: ROl eliminado con éxito
     *                 schema:
     *                      type: object
     *                      properties:
     *                          affectedRows:
     *                              type: integer
     *                              example: 1
     */
    api.delete('/rol', (req, res) => {
        var wheres = [];
        var where = '';
        for (var atr of Object.keys(req.query)){
            if (atr == 'rol' || atr == 'id_rol'){
                wheres.push(' ' + atr + ' = "' + req.query[atr] + '" ');
            }
        }
        for(var i = 0; i < wheres.length; i++){
            if (i == 0)  where += ' where ' + wheres[i];
            else        where += ' and ' + wheres[i];
        }

        connection.query('DELETE from roles ' + where + ' ', (error, results, fields) => {
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