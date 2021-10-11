const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
     res.send('Pagina de inicio');
    //res.render('layouts/main');
});

module.exports = router;