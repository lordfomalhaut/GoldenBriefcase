const mysql  = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'golden_briefcase_db'
});

connection.connect(function (error) {
    if(error){
        console.log(error.code);
        console.log(error.fatal);
    }
});

$query = 'SELECT * from rols';

connection.query($query, function (err, rows, fields) {
    if(error){
        console.log('Ha ocurrido un error ejecutando el query');
        return;
    }
    console.log("Query ejecutada con exito");
});

connection.end(function () {
    
});