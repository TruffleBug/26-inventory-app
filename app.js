const express = require('express');
const app = express();
const path = require('node:path');

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


const listController = require('./controllers/listController');
const indexRouter = require('./routes/indexRouter');

const listOfCategories = listController.createCategoryGet;

app.use('/', listOfCategories, indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}.`);
});