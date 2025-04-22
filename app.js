const express = require('express');
const app = express();
const path = require('node:path');

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}.`);
});

// ---------------------------------------------------------

const listController = require('./controllers/listController');
const indexRouter = require('./routes/indexRouter');
const listRouter = require('./routes/listRouter');
const deleteRouter = require('./routes/deleteRouter');
const updateRouter = require('./routes/updateRouter');
const newRouter = require('./routes/newRouter');

const listOfCategories = listController.createCategoryGet;

app.use('/', listOfCategories, indexRouter);
app.use('/list', listRouter);
app.use('/delete', deleteRouter);
app.use('/update', updateRouter);
app.use('/new', newRouter);

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.statusCode || 500).send(err.message);
});