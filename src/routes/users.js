const express = require('express');
const { route } = require('.');
const router = express.Router();
const pool = require('../database');

router.get('/list',  (req,res) => {
    pool.query('SELECT * FROM users',function(err, rows, fields){
        
        if (err) throw err
        res.render('users/list',{ title: "User Data", data: rows});

    });
});


module.exports = router;
