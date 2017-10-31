import { version } from '../../package.json';
import { Router } from 'express';
import RolesPermisoController from '../controllers/rolesPermisosController';

export default ({ config, db }) => {
    let api = Router();

    /**
     * @swagger
     * definition:
     *    Rol-Permiso:
     *        properties:
     *            id_permiso:
     *                type: integer
     *            id_rol:
     *                type: integer
     */

    /**
     * @swagger
     * /api/rolesPermisos/rolPermiso:
     *     get:
     *         tags:
     *             - Permisos
     *         description: devuelve las diferentes relaciones entre roles y permisos de turbomachos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name: id_rol
     *               type: integer
     *             - in: query
     *               name: id_permiso
     *               type: integer
     *         responses:
     *             200:
     *                 description: Un array de las diferentes relaciones entre roles y permisos de turbomachos
     *                 schema:
     *                     $ref: '#/definitions/Rol-Permiso'
     */
    api.get('/rolPermiso', (req, res) => {
        let aux = req.query;

        RolesPermisoController.getMiembro(aux, (error, results, fields) => {
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
     * /api/rolesPermisos/rolPermiso:
     *     post:
     *         tags:
     *             - Permisos
     *         description: Inserta una nueva relación entre un rol y un permiso
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Rol-Permiso
     *               schema:
     *                   type: object
     *                   properties:
     *                      id_permiso:
     *                          type: integer
     *                          example: 2
     *                      id_rol:
     *                          type: integer
     *                          example: 65
     *         responses:
     *             200:
     *                 description: Devuleve la nueva relación entre un rol y un permiso
     *                 schema:
     *                     $ref: '#/definitions/Rol-Permiso'
     */
    api.post('/rolPermiso', (req, res) => {
        let aux = {};
        if (req.body.id_rol)           aux.id_rol = req.body.id_rol;
        if (req.body.id_permiso)       aux.id_permiso = req.body.id_permiso;

        RolesPermisoController.postRolPermiso(aux, (error, results, fields) => {
            if(error){
                console.log(error);
                res.json(error);
            }
            if(results){
                RolesPermisoController.getMiembro(aux, (error, results, fields) => {
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
     * /api/rolesPermisos/rolPermiso:
     *     delete:
     *         tags:
     *             - Permisos
     *         description: Elimina una relación entre un rol y un permiso de la base de datos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name : id_permiso
     *               type: integer
     *             - in: query
     *               name: id_rol
     *               type: integer
     *
     *         responses:
     *             200:
     *                 description: Relación entre un rol y un permiso eliminado con éxito
     *                 schema:
     *                      type: object
     *                      properties:
     *                          affectedRows:
     *                              type: integer
     *                              example: 1
     */
    api.delete('/rolPermiso', (req, res) => {
        let aux = req.query;

        RolesPermisoController.deleteRolPermiso(aux, (error, results, fields) => {
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