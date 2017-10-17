import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import Miembro from '../models/miembroModel';
import connection from '../mysql/index';

export default ({ config, db }) => {
    let api = Router();

    // mount the facets resource
    api.use('/facets', facets({ config, db }));
    /**
     *
     * @swagger
     * definition:
     *    Miembro:
     *        properties:
     *            id_usuario:
     *                type: string
     *            imagen:
     *                type: string
     *            nombre:
     *                type: string
     *            biografia:
     *                type: string
     *            fecha_union:
     *                type: integer
     *            fecha_salida:
     *                type: integer
    */

    /**
     *
     * @swagger
     * definition:
     *    Usuario:
     *        properties:
     *            id_usuario:
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
      * /api/miembros:
      *     get:
      *         tags:
      *             - Miembros
      *         description: devuelve todos los miembros de turbomachos
      *         produces:
      *             - application/json
      *         responses:
      *             200:
      *                 description: Un array de miembros de tusbomachos
      *                 schema:
      *                     $ref: '#/definitions/Miembro'
     */
    // perhaps expose some API metadata at the root
    api.get('/miembros', (req, res) => {
        Miembro.find({}, function(error, resultado){
            if (error) res.json({error:'errooooor'});
            else res.json(resultado);
        });
    });

    /**
     * @swagger
     * /api/usuarios:
     *     get:
     *         tags:
     *             - Usuarios
     *         description: devuelve todos los usuarios de turbomachos
     *         produces:
     *             - application/json
     *         responses:
     *             200:
     *                 description: Un array de usuarios de turbomachos
     *                 schema:
     *                     $ref: '#/definitions/Usuario'
     */
    api.get('/usuarios', (req, res) => {
        // connection.query('INSERT INTO usuarios VALUES(0, "pakatanga", "tortilla", "pmus@turbomachos.com", "", "")',(error, results, fields) =>{
        //     console.log(results);
        // });
        connection.query('select * from usuarios', (error, results, fields)=>{
            res.json(results);
        });
    });

    return api;
}
