const express = require('express');
const bodyParser = require('body-parser');
// const db = require('./db_connect');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// app.use('/db', require('./routes/contenidodb'));


app.use(express.static('public'));

app.listen(port, function(){
    console.log('Servidor en http://localhost:${port}');
    // console.log('Rutas definidas: ');
    // console.log('   [GET] http://localhost:3000/');
});