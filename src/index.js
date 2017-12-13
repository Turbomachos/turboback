import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import api from './api';
import config from './config.json';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import configuracion from './configuracion/config';

import mysql from 'mysql';

let app = express();
app.server = http.createServer(app);

configuracion.cargarPermisos();

//conexión a MongoDB
mongoose.connect('mongodb://turbo:turbo@ds129733.mlab.com:29733/turboback');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected!');
});

let swaggerDefinition = {
    swagger:"2.0",
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    schemes: ["https"],
    host: 'www.turbomachos.com',
    basePath: '/back/v1',
};

let options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['dist/api/*.js'],
};

let swaggerSpec = swaggerJSDoc(options);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {
	// api router
	app.use('/api', api({ config, db }));

	app.get('/swagger.json', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        res.send(swaggerSpec);
    });

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});
export default app;