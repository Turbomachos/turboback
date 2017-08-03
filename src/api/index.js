import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
    let api = Router();

    // mount the facets resource
    api.use('/facets', facets({ config, db }));

    // perhaps expose some API metadata at the root
    api.get('/miembros', (req, res) => {
        res.json([
            {
                id_usuario: '123456789',
                imagen:'http://teleprograma.diezminutos.es/var/plan_site/storage/images/tele_corazon/2009/especiales/tal_como_era/david_hasselhoff/1265936-1-esl-ES/david_hasselhoff_tres-elementos_portrait.jpg',
                nombre:'Carlos Mollón Bou',
                biografia:'Me llamo chaaalyyyyyyyyyy',
                fecha_union: new Date(2017,8,1,0,0,0,0).getMilliseconds(),
                fecha_salida: undefined
            },
            {
                id_usuario: '234567891',
                imagen:'http://teleprograma.diezminutos.es/var/plan_site/storage/images/tele_corazon/2009/especiales/tal_como_era/david_hasselhoff/1265936-1-esl-ES/david_hasselhoff_tres-elementos_portrait.jpg',
                nombre:'David Albalate Cabedo',
                biografia:'',
                fecha_union: new Date(2017,8,1,0,0,0,0).getMilliseconds(),
                fecha_salida: undefined
            },
            {
                id_usuario: '345678912',
                imagen:'http://teleprograma.diezminutos.es/var/plan_site/storage/images/tele_corazon/2009/especiales/tal_como_era/david_hasselhoff/1265936-1-esl-ES/david_hasselhoff_tres-elementos_portrait.jpg',
                nombre:'Enrique Poré Pérez',
                biografia:'',
                fecha_union: new Date(2017,8,1,0,0,0,0).getMilliseconds(),
                fecha_salida: undefined
            },
            {
                id_usuario: '456789123',
                imagen:'http://teleprograma.diezminutos.es/var/plan_site/storage/images/tele_corazon/2009/especiales/tal_como_era/david_hasselhoff/1265936-1-esl-ES/david_hasselhoff_tres-elementos_portrait.jpg',
                nombre:'Lluís Nebot Español',
                biografia:'',
                fecha_union: new Date(2017,8,1,0,0,0,0).getMilliseconds(),
                fecha_salida: undefined
            },
            {
                id_usuario: '567891234',
                imagen:'http://teleprograma.diezminutos.es/var/plan_site/storage/images/tele_corazon/2009/especiales/tal_como_era/david_hasselhoff/1265936-1-esl-ES/david_hasselhoff_tres-elementos_portrait.jpg',
                nombre:'Francisco Mus Chovares',
                biografia:'',
                fecha_union: new Date(2017,8,1,0,0,0,0).getMilliseconds(),
                fecha_salida: undefined
            },
        ]);
    });

    return api;
}
