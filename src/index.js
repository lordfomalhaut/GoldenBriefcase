const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const exphbs = require('express-handlebars');
const path = require('path');


// Inicialización
const app = express();


// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.handlebars', exphbs({
   defaultLayout: 'main',
   layoutsDir:  path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials'),
   extname: '.hbs',
   helpers: require('./lib/handebars')
}));
app.set('view engine', '.handlebars');


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());



// Variables Globales
app.use((req, res, next) => {


    next();
})


// Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


// Public
app.use(express.static(path.join(__dirname, 'public')));



// Iniciar Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto: ', app.get('port'));
});