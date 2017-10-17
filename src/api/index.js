import { version } from '../../package.json';
import { Router } from 'express';
import miembros from './miembros';
import usuarios from './usuarios'

export default ({ config, db }) => {
    let api = Router();

    api.use('/miembros', miembros({ config, db }));

    api.use('/usuarios', usuarios({ config, db }));

    return api;
}
