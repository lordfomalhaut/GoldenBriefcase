const express = require('express');
const router = express.Router();
const upload = require('express-fileupload');
const http = require('http');
// const formidable = require('formidable');
const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('movies/add');
});


router.post('/add',  (req, res) => {

    const {title, director, description} = req.body;
  
    if(req.files){
        console.log(req.files.movie);
    }

    var file = req.files.movie;
    var filename = file.name;
    var fileLink ='src\\public\\movies_files\\'+filename;
    console.log(__dirname)
    
    

    file.mv(fileLink, function (err){

        if (err){
            res.send(err)
        }else{
            var query = 'INSERT INTO movies (uploadedBy_id,title, director, description, address ) VALUES (?,?,?,?,?)';
            try{
                pool.query(query,[1,title,director,description,'movies_files/'+filename])
                res.send("File Uploaded")
            }catch(err){
                console.log(err)
                res.send(err)
            }
            
        }

        

    });
});

// router.get('/list', async (req, res) => {
//     const movies = await pool.query('SELECT * FROM movies');
//     console.log(movies);
//     res.send('peliculas iran aqui'); 

// });




 module.exports = router;