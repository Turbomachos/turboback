
import mysql from 'mysql';

var connection = mysql.createConnection({
    host:'localhost',
    user:'turbomachos',
    password : 'Turbo.machos91',
    database: 'turbomachos',
    port: '3306'
});

connection.connect(function(error){
    if(error){
        console.log('error conectando a mysql: ' + error.stack);
    }else{
        console.log('conexión de maravilla');
    }
});

export default connection;
