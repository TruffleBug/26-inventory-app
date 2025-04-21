const { Router } = require('express');
const updateRouter = Router();
const listController = require('../controllers/listController');

updateRouter
    .get('/:animal', listController.createUpdateAnimalGet)
    .post('/:animal', listController.createUpdateAnimalPost);

module.exports = updateRouter;