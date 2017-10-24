import { version } from '../../package.json';
import { Router } from 'express';
import connection from '../mysql/index';

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

    });

    return api;
}