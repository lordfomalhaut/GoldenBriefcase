const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
//const multer = require('multer');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const upload = require('express-fileupload');

const {database} = require('./keys');
const cookieParser = require('cookie-parser');

// Inicialización
const app = express();
require('./lib/passport');


// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
   defaultLayout: 'main',
   layoutsDir:  path.join(app.get('views'), 'layouts'),
   partialsDir: path.join(app.get('views'), 'partials'),
   extname: '.hbs',
   helpers: require('./lib/handebars')
}));
app.set('view engine', '.hbs');


const oneDay = 1000 * 60 * 60 * 24;
// Middlewares
app.use(session({
    secret: 'goldenbriefcasesession',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

//let objMulter = multer({ dest: "src\\public\\upload"});
//app.use(objMulter.any());

app.use(upload())


//FILES



// Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
})


// Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/movies', require('./routes/movies'));
app.use('/users', require('./routes/users'));
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


// Public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 


// Iniciar Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto: ', app.get('port'));
});