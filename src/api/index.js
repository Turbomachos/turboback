import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import Miembro from '../models/miembroModel';

export default ({ config, db }) => {
    let api = Router();

    // mount the facets resource
    api.use('/facets', facets({ config, db }));

    // perhaps expose some API metadata at the root
    api.get('/miembros', (req, res) => {
        Miembro.find({}, function(error, resultado){
            if (error) res.json({error:'errooooor'});
            else res.json(resultado);
        });
    });

    return api;
}
