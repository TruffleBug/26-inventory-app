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
    const animal = await db.getAnimalById(req.params.animalId);
	await db.deleteAnimal(req.params.animalId);
    res.render('confirmation', { title: 'Confirmation', item: animal[0].name, action: 'deleted' });
};

async function createUpdateAnimalGet(req, res) {
    const animalInfo = await db.getAnimalById(req.params.animalId);
    const allClasses = await db.getSubcat('class');
    const allColors = await db.getSubcat('color');
    const allSizes = await db.getSubcat('size');
    res.render('revisionForm', { title: `Update ${animalInfo[0].name}`, item: animalInfo[0], allClasses: allClasses, allColors: allColors, allSizes: allSizes });
};

async function createUpdateAnimalPost(req, res) {
    const { newName, newClass, newColor, newSize, newQuantity } = req.body;
    // const animal = await db.getAnimalById(req.params.animalId);
    await db.updateAnimal(req.params.animalId, newName, newClass, newColor, newSize, newQuantity);
    res.render('confirmation', { title: 'Confirmation', item: newName, action: 'updated' });
};

async function createNewAnimalGet(req, res) {
    const allClasses = await db.getSubcat('class');
    const allColors = await db.getSubcat('color');
    const allSizes = await db.getSubcat('size');
    res.render('new', { title: 'New Animal', allClasses: allClasses, allColors: allColors, allSizes: allSizes })
};

async function createNewAnimalPost(req, res) {
    await db.postNewAnimal(req.body);
    let nameFormatted = req.body.enterName.charAt(0).toUpperCase() + req.body.enterName.slice(1);
    res.render('confirmation', { title: 'Confirmation', item: nameFormatted, action: 'added' });
};

module.exports = {
    createCategoryGet,
    createSubcatGet, 
    createAnimalsInSubcatGet,
    createAllAnimalGet,
    createDeleteAnimalPost,
    createUpdateAnimalGet,
    createUpdateAnimalPost,
    createNewAnimalGet,
    createNewAnimalPost
}