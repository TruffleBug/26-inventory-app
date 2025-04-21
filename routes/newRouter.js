const { Router } = require('express');
const newRouter = Router();
const listController = require('../controllers/listController');

newRouter
    .get('/', listController.createNewAnimalGet)
    .post('/', listController.createNewAnimalPost)

module.exports = newRouter;