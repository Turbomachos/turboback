import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	routes.use((req, res, next) => {
		console.log('req.originalUrl', req.originalUrl);
        console.log('req.baseUrl', req.baseUrl);
        console.log('req.path', req.path);
        if(hasPermission(req)){
        	next();
		}else{
        	res.status(401).send('NO PUEDES PASAR!');
		}
	});

	return routes;
}
