const { Router } = require('express');
const indexRouter = Router();

indexRouter
    .get('/', async (req, res) => {
        const categories = res.locals.categories;
        const subcats = res.locals.subcats;
        res.render('index', { title: 'Helloooo', categories: categories, subcats: subcats });
    })

module.exports = indexRouter;