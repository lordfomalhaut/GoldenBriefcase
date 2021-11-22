const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');
const session = require('express-session')



router.get('/signup', (req, res) => {
    session=req.session;
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local.login',(err, user, info) =>{
        
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        req.login(user, (err) => {
          console.log('Inside req.login() callback')
          console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
          console.log(`req.user: ${JSON.stringify(req.user)}`)
          return res.redirect('/profile');
          
        })
    })(req, res, next);
});


router.get('/profile', (req, res) => {
    pool.query('SELECT * FROM movies',function(err, rows, fields){
        
        if (err) throw err
        res.render('auth/profile',{ title: "Movie Data", data: rows});

    });
    
});




module.exports = router;