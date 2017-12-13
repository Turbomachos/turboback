import { Router } from 'express';
import jwt from 'jwt-simple';
import configuracion from '../configuracion/config';
import moment from 'moment';

export default ({ config, db }) => {
	let routes = Router();

	routes.use((req, res, next) => {

        let endpoint = req.method + req.path;
        if(endpoint == 'POST/usuarios/login' || endpoint == 'POST/usuarios/usuario'){
            next();
        }else{
            if(!req.headers.authorization){
                res.status(403).send(configuracion.NO_AUTORIZADO);
            }else{
                let token_encoded = req.headers.authorization.split(" ")[1];
                let token_decoded = jwt.decode(token_encoded, configuracion.SECRET_TOKEN);
                let roles = token_decoded.roles;

                if(token_decoded.f_expiracion <= moment().unix()){
                    res.status(401).send(configuracion.TOKEN_EXPIRADO);
                }else{
                    let continuar = roles.some((rol) => {
                        return configuracion.PERMISOS_ENDPOINT[endpoint].indexOf(rol.id_rol) >= 0;
                    });

                    if (continuar){

                        next();
                    }else{
                        res.status(403).send(configuracion.NO_AUTORIZADO);
                    }
                }
            }
        }
	});

	return routes;
}
