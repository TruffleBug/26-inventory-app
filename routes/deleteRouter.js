const { Router } = require('express');
const deleteRouter = Router();
const listController = require('../controllers/listController');

deleteRouter
    .post('/:animalId', listController.createDeleteAnimalPost)


module.exports = deleteRouter;