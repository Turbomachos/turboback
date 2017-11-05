import sha1 from 'sha1';
import moment from 'moment';
import jwt from 'jwt-simple';
import UsuariosRoles from '../controllers/usuariosRolesController';
import config from '../configuracion/config';


var TurboUtils = {
    generateHash : (string) => {
        return sha1(string);
    },

    createToken : (user, callback) => {
       UsuariosRoles.getListaRoles(user.id_usuario, (error, results, fields) => {
            let token = {
                username: user.username,
                id_usuario: user.id_usuario,
                email: user.email,
                roles: results,
                f_creacion: moment().unix(),
                f_expiracion: moment().add(14, 'days').unix(),
            };
            callback(jwt.encode(token, config.SECRET_TOKEN));
        });

    },
};

export default TurboUtils
