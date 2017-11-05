import { version } from '../../package.json';
import { Router } from 'express';
import UsuariosController from '../controllers/usuariosController';
import TurboUtils from '../utils/index';
import UsuariosRolesController from '../controllers/usuariosRolesController';

export default ({ config, db }) => {
    let api = Router();

    /**
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
     *                type: string
     *            nombre_perfil:
     *                type: string
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
        let aux = req.query;
        UsuariosController.getUsuario(aux, (error, results, fields) => {
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
        let aux = {};
        if (req.body.username)          aux.username = req.body.username;
        if (req.body.nombre_perfil)     aux.nombre_perfil = req.body.nombre_perfil;
        if (req.body.imagen)            aux.imagen = req.body.imagen;
        if (req.body.email)             aux.email = req.body.email;
        if (req.body.password)          aux.password = TurboUtils.generateHash(req.body.password);

        UsuariosController.postUsuario(aux, (error, results, fields) => {
            if(error){
                console.log(error);
                res.json(error);
            }
            if(results){
                UsuariosRolesController.postUsuarioRol({id_rol:3, id_usuario: results.insertId});
                UsuariosController.getUsuario({id_usuario:results.insertId}, (error, results, fields) => {
                    if(error){
                        console.log(error);
                        res.json(error);
                    }
                    if(results){
                        console.log(results);
                        results.token = TurboUtils.createToken(results);
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
     *                      type: object
     *                      properties:
     *                          affectedRows:
     *                              type: integer
     *                              example: 1
     */
    api.put('/usuario', (req, res ) => {
        let aux = req.body;

        UsuariosController.putUsuario(aux, (error, results, fields) => {
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
        let aux = req.query;

        UsuariosController.deleteUsuario(aux, (error, results, fields) => {
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

    /**
     * @swagger
     * /api/usuarios/login:
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
     *                      password:
     *                          type: string
     *                          example: Patata22
     *         responses:
     *             200:
     *                 description: Devuleve el usuario creado
     *                 schema:
     *                     $ref: '#/definitions/Usuario'
     */
    api.post('/login', (req, res) => {
        let aux = {};
        if (req.body.username)          aux.username = req.body.username;
        if (req.body.password)          aux.password = TurboUtils.generateHash(req.body.password);

        if(!aux.username || aux.password){
            res.json({error: "error"})
        }
        UsuariosController.login(aux.username, aux.password, (error, results, values) => {
           if(error){
               res.json({error: error})
           }
           if(results.length == 1){
               results[0].token = TurboUtils.createToken(results[0]);
               res.json(results[0]);
           }else{
               res.json({error: "error"})
           }
        });
    });

    return api;
}
