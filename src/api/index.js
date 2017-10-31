import { version } from '../../package.json';
import { Router } from 'express';
import miembros from './miembros';
import usuarios from './usuarios';
import roles from './roles';
import permisos from './permisos';
import rolesPermisos from './rolesPermisos';
import middleware from '../middleware';

export default ({ config, db }) => {
    let api = Router();

    api.use(middleware({ config, db }));

    api.use('/miembros', miembros({ config, db }));

    api.use('/usuarios', usuarios({ config, db }));

    api.use('/roles', roles({ config, db }));

    api.use('/permisos', permisos({ config, db }));

    api.use('/rolesPermisos', rolesPermisos({ config, db }));

    return api;
}
