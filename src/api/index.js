import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import Miembro from '../models/miembroModel';

export default ({ config, db }) => {
    let api = Router();

    // mount the facets resource
    api.use('/facets', facets({ config, db }));

    /**
     * @swagger
     * definition:
     *   Miembro:
     *     properties:
     *       id_usuario:
     *         type: string
     *       imagen:
     *         type: string
     *       nombre:
     *         type: string
     *       biografia:
     *         type: string
     *       fecha_union:
     *         type: integer
     *       fecha_salida:
     *         type: integer
     */

    /*
    * @swagger
    * /api/miembros:
    *   get:
    *       tags:
    *           -miembros
    *        description: devuelve todos los miembros ed tusbomachos
    *        produces:
    *           - application/json
    *        responses:
    *           200:
    *               description: Un array de miembros de tusbomachos
    *               schema:
    *                   $ref: '#/definitions/Miembro'*/
    // perhaps expose some API metadata at the root
    api.get('/miembros', (req, res) => {
        Miembro.find({}, function(error, resultado){
            if (error) res.json({error:'errooooor'});
            else res.json(resultado);
        });
    });

    return api;
}
