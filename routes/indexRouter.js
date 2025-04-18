const { Router } = require('express');
const indexRouter = Router();

indexRouter
    .get('/', async (req, res) => {
        const links = res.locals.categories;
        res.render('index', { title: 'Helloooo', links: links })
    })

module.exports = indexRouter;