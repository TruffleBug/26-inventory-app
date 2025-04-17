const { Router } = require('express');
const indexRouter = Router();
// const userController = require('../controllers/userController');

indexRouter
    // .get('/', userController.getUsernames)
    // .get('/search', userController.usersSearch)
    .get('/', (req, res) => {
        res.send('index page')
    })

module.exports = indexRouter;