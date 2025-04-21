const { Router } = require('express');
const listRouter = Router();
const listController = require('../controllers/listController');

listRouter
    .get('/all', listController.createAllAnimalGet)
    .get('/:category/:subcat', listController.createAnimalsInSubcatGet)
    .get('/:category', listController.createSubcatGet)    

module.exports = listRouter;