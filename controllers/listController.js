const { body, validationResult, matchedData } = require('express-validator');
const db = require('../db/queries');


async function createCategoryGet(req, res, next) {
	const categories = await db.getCategories();
    res.locals.categories = categories;
    next();
};

async function createSubcatGet(req, res) {
    const subcats = await db.getSubcat(req.params.category);
    res.render('subcat', { title: `Select a ${req.params.category}`, category: req.params.category, subcats: subcats })
};

async function createAnimalsInSubcatGet(req, res) {
    const subcatAnimals = await db.getAnimalsInSubcat(req.params.category, req.params.subcat);
    res.render('list', { title: `View by ${req.params.category}`, subtitle: req.params.subcat, category: req.params.category, list: subcatAnimals })
};

async function createAllAnimalGet(req, res) {
	const allAnimals = await db.getAllAnimals();
    res.render('list', { title: 'View all', list: allAnimals });
};

module.exports = {
    createCategoryGet,
    createSubcatGet, 
    createAnimalsInSubcatGet,
    createAllAnimalGet
}