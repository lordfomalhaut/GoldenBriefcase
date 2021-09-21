const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get('/', function(req, res){
    res.status(200).send({
        message: 'Ruta inicial'
    });

});

app.listen(port, function(){
    console.log('Servidor en http://localhost:${port}');
    console.log('Rutas definidas: ');
    console.log('   [GET] http://localhost:3000/');
});