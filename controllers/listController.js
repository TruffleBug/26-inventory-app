const { body, validationResult, matchedData } = require('express-validator');
const db = require('../db/queries');


async function createCategoryGet(req, res, next) {
	const categories = await db.getCategories();
    res.locals.categories = categories;
    next();
};

async function createSubcatGet(req, res) {
    const subcats = await db.getSubcat(req.params.category);
    res.render('list', { title: `Select a ${req.params.category}`, category: req.params.category, subcatList: subcats })
};

async function createAnimalsInSubcatGet(req, res) {
    const subcatAnimals = await db.getAnimalsInSubcat(req.params.category, req.params.subcat);
    res.render('list', { title: `View by ${req.params.category}`, subcat: req.params.subcat, category: req.params.category, list: subcatAnimals })
};

async function createAllAnimalGet(req, res) {
	const allAnimals = await db.getAllAnimals();
    res.render('list', { title: 'View all', list: allAnimals });
};

async function createDeleteAnimalPost(req, res) {
	await db.deleteAnimal(req.params.animal);
    res.render('confirmation', { title: 'Confirmation', item: req.params.animal, action: 'deleted' });
};

async function createUpdateAnimalGet(req, res) {
    const animalInfo = await db.getAnimalInfo(req.params.animal);
    const allClasses = await db.getSubcat('class');
    const allColors = await db.getSubcat('color');
    const allSizes = await db.getSubcat('size');
    res.render('revisionForm', { title: `Update ${req.params.animal}`, item: animalInfo[0], allClasses: allClasses, allColors: allColors, allSizes: allSizes });
};

async function createUpdateAnimalPost(req, res) {
    const { newName, newClass, newColor, newSize, newQuantity } = req.body;
    console.log('ANIMAL: ', req.params, ', REQUEST BODY: ', req.body)
    // db.updateAnimal(req.params.animal[0], req.body);
    // res.render('confirmation', { title: 'Confirmation', item: req.params.animal, action: 'updated' });
};

module.exports = {
    createCategoryGet,
    createSubcatGet, 
    createAnimalsInSubcatGet,
    createAllAnimalGet,
    createDeleteAnimalPost,
    createUpdateAnimalGet,
    createUpdateAnimalPost
}