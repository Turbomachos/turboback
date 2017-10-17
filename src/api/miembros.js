import { version } from '../../package.json';
import { Router } from 'express';
import Miembro from '../models/miembroModel';
import moment from 'moment';

export default ({ config, db }) => {
    let api = Router();

    /**
     *
     * @swagger
     * definition:
     *    Miembro:
     *        properties:
     *            _id:
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
     * @swagger
     * /api/miembros/miembro:
     *     get:
     *         tags:
     *             - Miembros
     *         description: Devuelve todos los miembros de turbomachos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name : nombre
     *               type: string
     *             - in: query
     *               name : descripcion
     *               type:string
     *             - in: query
     *               name : fecha_union
     *               type: integer
     *             - in: query
     *               name : fecha_salida
     *               type: integer
     *             - in: query
     *               name : imagen
     *               type: string
     *             - in: query
     *               name : _id
     *               type: string
     *         responses:
     *             200:
     *                 description: Un array de miembros de turbomachos
     *                 schema:
     *                     $ref: '#/definitions/Miembro'
     */

    api.get('/miembro', (req, res) => {
        var aux = {};
        if (req.query.nombre)            aux.nombre = req.query.nombre;
        if (req.query.biografia)         aux.biografia = req.query.biografia;
        if (req.query.fecha_union)       aux.fecha_union = req.query.fecha_union;
        if (req.query.fecha_salida)      aux.fecha_salida = req.query.fecha_salida;
        if (req.query.imagen)            aux.imagen = req.query.imagen;
        if (req.query._id)               aux._id = req.query._id;

        Miembro.find(aux, function(error, resultado){
            if (error) res.json({error:'errooooor'});
            else res.json(resultado);
        });
    });

    /**
     * @swagger
     * /api/miembros/miembro:
     *     post:
     *         tags:
     *             - Miembros
     *         description: Inserta un nuevo miembro
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Miembro
     *               schema:
     *                   nombre:
     *                       type: string
     *                   biografia:
     *                       type: string
     *         responses:
     *             200:
     *                 description: Devuleve el miembro creado
     *                 schema:
     *                     $ref: '#/definitions/Miembro'
     */
    api.post('/miembro', (req, res) => {
        var aux = {};
        if (req.body.nombre)        aux.nombre = req.body.nombre;
        if (req.body.biografia)     aux.biografia = req.body.biografia;
        aux.fecha_union = moment().unix();
        var miembro = new Miembro(aux);
        miembro.save(function (err, miembro) {
            if (err) return console.error(err);
            res.json(miembro);
        });
    });


    /**
     * @swagger
     * /api/miembros/miembro:
     *     put:
     *         tags:
     *             - Miembros
     *         description: Inserta un nuevo miembro
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: body
     *               name : Miembro
     *               schema:
     *                   imagen:
     *                       type: string
     *                   nombre:
     *                       type: string
     *                   biografia:
     *                       type: string
     *                   fecha_union:
     *                       type: integer
     *                   fecha_salida:
     *                       type: integer
     *         responses:
     *             200:
     *                 description: Devuleve el miembro creado
     *                 schema:
     *                     $ref: '#/definitions/Miembro'
     */
    api.put('/miembro', (req, res) => {
        var aux = {};
        var id = undefined;
        if (req.body.nombre)            aux.nombre = req.body.nombre;
        if (req.body.biografia)         aux.biografia = req.body.biografia;
        if (req.body.fecha_union)       aux.fecha_union = req.body.fecha_union;
        if (req.body.fecha_salida)      aux.fecha_salida = req.body.fecha_salida;
        if (req.body.imagen)            aux.imagen = req.body.imagen;
        if (req.body._id)               id = req.body._id;
        Miembro.findById(id, function(error, miembro){
            if (error) res.json({error:'errooooor'});
            else {
                miembro.set(aux);
                miembro.save(function (err, miembro) {
                    if (err) return console.error(err);
                    res.json(miembro);
                });
            }
        });
    });


    /**
     * @swagger
     * /api/miembros/miembro:
     *     delete:
     *         tags:
     *             - Miembros
     *         description: Elimina un turbomacho de la base de datos
     *         produces:
     *             - application/json
     *         parameters:
     *             - in: query
     *               name : nombre
     *               type: string
     *             - in: query
     *               name : descripcion
     *               type:string
     *             - in: query
     *               name : fecha_union
     *               type: integer
     *             - in: query
     *               name : fecha_salida
     *               type: integer
     *             - in: query
     *               name : imagen
     *               type: string
     *             - in: query
     *               name : _id
     *               type: string
     *
     *         responses:
     *             200:
     *                 description: Turbomacho eliminado con éxito
     *                 schema:
     *                     $ref: '#/definitions/Miembro'
     */
    api.delete('/miembro', (req, res) => {
        var id = undefined;
        var aux = {};
        if (req.query.nombre)            aux.nombre = req.query.nombre;
        if (req.query.biografia)         aux.biografia = req.query.biografia;
        if (req.query.fecha_union)       aux.fecha_union = req.query.fecha_union;
        if (req.query.fecha_salida)      aux.fecha_salida = req.query.fecha_salida;
        if (req.query.imagen)            aux.imagen = req.query.imagen;
        if (req.query._id)               aux._id = req.query._id;
        console.log(aux);
        Miembro.remove(aux, function(error, miembro){
            if (error) res.json({error:'errooooor'});
            else {
                res.json(miembro);
            }
        });
    });



    return api;
}