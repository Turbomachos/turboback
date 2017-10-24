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
     * /api/usuariosRoles/usuarioRola:
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

    });

    return api;
}