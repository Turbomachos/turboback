import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import mongoose from 'mongoose';
import Miembro from './models/miembroModel';
let app = express();
app.server = http.createServer(app);

mongoose.connect('mongodb://turbo:turbo@ds129733.mlab.com:29733/turboback');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected!');
    // let paco = new Miembro({
    //     id_usuario: '123456789',
    //     imagen:'http://teleprograma.diezminutos.es/var/plan_site/storage/images/tele_corazon/2009/especiales/tal_como_era/david_hasselhoff/1265936-1-esl-ES/david_hasselhoff_tres-elementos_portrait.jpg',
    //     nombre:'Carlos Mollón Bou',
    //     biografia:'Me llamo chaaalyyyyyyyyyy',
    //     fecha_union: new Date(2017,8,1,0,0,0,0).getMilliseconds(),
    //     fecha_salida: undefined
    // });
    // paco.save(function (err, fluffy) {
    //     if (err) return console.error(err);
    //     else return fluffy;
    // });
});

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

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
