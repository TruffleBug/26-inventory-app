const { Router } = require('express');
const deleteRouter = Router();
const listController = require('../controllers/listController');

deleteRouter
    .post('/:animal', listController.createDeleteAnimalPost);

module.exports = deleteRouter;