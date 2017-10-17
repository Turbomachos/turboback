import { version } from '../../package.json';
import { Router } from 'express';
import connection from '../mysql/index';

export default ({ config, db }) => {
    let api = Router();

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
     * /api/usuarios/usuario:
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
    api.get('/usuario', (req, res) => {
        // connection.query('INSERT INTO usuarios VALUES(0, "pakatanga", "tortilla", "pmus@turbomachos.com", "", "")',(error, results, fields) =>{
        //     console.log(results);
        // });
        connection.query('select * from usuarios', (error, results, fields)=>{
            res.json(results);
        });
    });

    return api;
}
