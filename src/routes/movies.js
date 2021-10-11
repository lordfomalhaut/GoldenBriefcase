const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('movies/add');
});

router.post('/add', async (req, res) => {
    const {title, director, description, address} = req.body;
    const newMovie = {
        title,
        director,
        description,
        address
    };
    try {
        await pool.query('INSERT INTO movies set ?', [newMovie]);
    } catch (e) {
        console.log(e);
    }
    
    res.send(
        'recibido'
    );
});

router.get('/', async (req, res) => {
    const movies = await pool.query('SELECT * FROM movies');
    console.log(movies);
    res.send('peliculas iran aqui');

});




module.exports = router;