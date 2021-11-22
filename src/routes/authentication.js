const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');




router.get('/signup', (req, res) => {
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
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


router.get('/profile', (req, res) => {
    pool.query('SELECT * FROM movies',function(err, rows, fields){
        
        if (err) throw err
        res.render('auth/profile',{ title: "Movie Data", data: rows});
        console.log(rows);
    });
    
});




module.exports = router;