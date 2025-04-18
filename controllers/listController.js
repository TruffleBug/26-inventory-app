const { body, validationResult, matchedData } = require('express-validator');
const db = require('../db/queries');


async function createCategoryGet(req, res, next) {
	const categories = await db.getCategories();
    res.locals.categories = categories;
    next();
};

async function createSubcatGet(req, res, next) {
    const subcats = await db.getSubcat(req.params.category);
    res.locals.subcats = subcats;
    next();
};

async function createAnimalsInSubcatGet(req, res) {
    const subcatAnimals = await db.getAnimalsInSubcat(req.params.category, req.params.subcat);
    res.render('list', { title: `View by ${req.params.category}`, subtitle: req.params.subcat, list: subcatAnimals})
};

async function createAllAnimalGet(req, res) {
	const allAnimals = await db.getAllAnimals();
    res.render('list', { title: 'View all', list: allAnimals });
};

module.exports = {
    createCategoryGet,
    createSubcatGet, 
    // showSubcat,
    createAnimalsInSubcatGet,
    createAllAnimalGet
}