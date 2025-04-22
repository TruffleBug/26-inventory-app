const { Router } = require('express');
const updateRouter = Router();
const listController = require('../controllers/listController');

updateRouter
    .route('/:animalId')
    .get(listController.createUpdateAnimalGet)
    .post(listController.createUpdateAnimalPost);

module.exports = updateRouter;