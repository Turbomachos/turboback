import { version } from '../../package.json';
import { Router } from 'express';
import PermisosController from '../controllers/permisosController';


export default ({ config, db }) => {
    let api = Router();

    /**
     * @swagger
     * definition:
     *    Permiso:
     *        properties:
     *            id_permiso:
     *                type: integer
     *            permiso:
     *                type: string
     *            descripcion:
     *                type: string
     */

    /**
     * @swagger
     * /api/permisos/permiso:
     *     get:
     *         tags:
     *             - Permisos
     *         description: devuelve los diferentes permisos de turbomachos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name: id_permiso
     *               type: integer
     *             - in: query
     *               name: permiso
     *               type: string
     *         responses:
     *             200:
     *                 description: Un array de los permisos de turbomachos
     *                 schema:
     *                     $ref: '#/definitions/Permiso'
     */
    api.get('/permiso', (req, res) => {
        var aux = req.query;

        PermisosController.getPermiso(aux, (error, results, fields) => {
            if(error){
                res.json(error);
            }
            if(results){
                res.json(results);
            }
        });

    });

    /**
     * @swagger
     * /api/permisos/permiso:
     *     post:
     *         tags:
     *             - Permisos
     *         description: Inserta un nuevo permiso
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Permiso
     *               schema:
     *                   type: object
     *                   properties:
     *                      permiso:
     *                          type: string
     *                          example: tortilla22
     *                      descripcion:
     *                          type: string
     *                          example: Shurminator2000
     *         responses:
     *             200:
     *                 description: Devuleve el permiso creado
     *                 schema:
     *                     $ref: '#/definitions/Permiso'
     */
    api.post('/permiso', (req, res) => {
        var aux = {};
        if (req.body.permiso)           aux.permiso = req.body.permiso;
        if (req.body.descripcion)       aux.descripcion = req.body.descripcion;

        PermisosController.postPermiso(aux, (error, results, fields) => {
            if(error){
                res.json(error);
            }
            if(results){
                PermisosController.getPermiso({id_permiso : results.insertId}, (error, results, fields) => {
                    if(error){
                        res.json(error);
                    }
                    if(results){
                        res.json(results);
                    }
                });
            }
        });

    });

    /**
     * @swagger
     * /api/permisos/permiso:
     *     put:
     *         tags:
     *             - Permisos
     *         description: Modifica un permiso existente
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Permiso
     *               schema:
     *                   type: object
     *                   properties:
     *                      id_permiso:
     *                          type: integer
     *                          example: 15
     *                      permiso:
     *                          type: string
     *                          example: Shur0
     *                      descripcion:
     *                          type: string
     *                          example: Shurminator2000
     *         responses:
     *             200:
     *                 description: Devuleve el permiso modificado
     *                 schema:
     *                      type: object
     *                      properties:
     *                          affectedRows:
     *                              type: integer
     *                              example: 1
     */
    api.put('/permiso', (req, res) => {
        let aux = req.body;

        PermisosController.putPermiso(aux, (error, results, fields) => {
            if(error){
                res.json(error);
            }
            if(results){
                res.json({affectedRows: results.affectedRows});
            }
        });

    });

    /**
     * @swagger
     * /api/permisos/permiso:
     *     delete:
     *         tags:
     *             - Permisos
     *         description: Elimina un permiso de la base de datos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name : id_permiso
     *               type: integer
     *             - in: query
     *               name: permiso
     *               type: string
     *
     *         responses:
     *             200:
     *                 description: Permiso eliminado con éxito
     *                 schema:
     *                      type: object
     *                      properties:
     *                          affectedRows:
     *                              type: integer
     *                              example: 1
     */
    api.delete('/permiso', (req, res) => {
        let aux = req.query;

        PermisosController.deletePermiso(obj, (error, results, fields) => {
            if(error){
                res.json(error);
            }
            if(results){
                res.json({affectedRows: results.affectedRows});
            }
        });
    });

    return api;
}