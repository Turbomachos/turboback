
import mysql from 'mysql';

var mysql_config = {
    host:'www.turbomachos.com',
    user:'turbouser',
    password : 'Turbo.machos91',
    database: 'turbomachos',
    port: '3306'
};

var connection;

var handleDisconnect = () => {
    connection = mysql.createConnection(mysql_config);
    connection.connect(function(error){
        if(error){
            console.log('error conectando a mysql: ' + error.stack);
        }else{
            console.log('conexión de maravilla');
        }
    });

    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
};

handleDisconnect();

export default connection;
