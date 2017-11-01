import { Router } from 'express';
import jwt from 'jwt-simple';
import config from '../configuracion/config';
import moment from 'moment';

export default ({ config, db }) => {
	let routes = Router();

	routes.use((req, res, next) => {

        if(!req.headers.authorization){
            res.status(403).send(config.NO_AUTORIZADO);
        }
        let endpoint = req.method + req.path;
        let token_encoded = req.headers.authorization.split(" ")[1];
        let token_decoded = jwt.decode(token_encoded, config.SECRET_TOKEN);
        let roles = token_decoded.roles;

        if(token_decoded.f_expiracion <= moment().unix()){
            res.status(401).send(config.TOKEN_EXPIRADO);
        }

        let continuar = roles.some((rol) => {
            return config.PERMISOS_ENDPOINT[endpoint].indexOf(rol) >= 0;
        });

        if (continuar){
            next();
        }else{
            res.status(403).send(config.NO_AUTORIZADO);
        }

	});

	return routes;
}
