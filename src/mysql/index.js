import mysql from '../node_modules/mysql';
//conexión MySQL
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
    }
});

connection.query('INSERT INTO `usuarios` VALUES(0, "pakatanga", "tortilla", "pmus@turbomachos.com", "", "")');

export default connection;