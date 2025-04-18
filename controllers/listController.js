const { body, validationResult, matchedData } = require('express-validator');
const db = require('../db/queries');

async function createCategoryGet(req, res, next) {
	const categories = await db.getCategories();
    res.locals.categories = categories;
    next();
};

module.exports = {
    createCategoryGet
}