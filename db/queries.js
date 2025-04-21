const pool = require("./pool");

async function getCategories() {
    let { rows } = await pool.query(`
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema='public' 
        AND table_type='BASE TABLE' 
        ORDER BY table_name ASC;`);
    rows = rows.filter(row => row.table_name !== 'animals');
    return rows;
};

async function getSubcat(category) {
    const { rows } = await pool.query(`SELECT name FROM ${category} ORDER BY name ASC;`);
    return rows;
};

async function getAnimalsInSubcat(category, subcat) {
    const { rows } = await pool.query(`
        SELECT name, quantity FROM animals
        WHERE ${category} = 
        (SELECT id FROM ${category} WHERE name LIKE '${subcat}')`);
    return rows;
};

async function getAllAnimals() {
    const { rows } = await pool.query(`SELECT name, quantity FROM animals ORDER BY name ASC;`);
    return rows;
};

async function deleteAnimal(animal) {
    await pool.query(`DELETE FROM animals WHERE name='${animal}';`);
    return;
};

async function getAnimalInfo(animal) {
    const { rows } = await pool.query(`
        SELECT animals.name, class.name AS class, color.name AS color, size.name AS size, animals.quantity FROM animals 
        JOIN class ON animals.class = class.id
        JOIN color ON animals.color = color.id
        JOIN size ON animals.size = size.id
        WHERE animals.name='${animal}';`);
    return rows;
};

async function updateAnimal(animal, newInfo) {
    console.log(animal, newInfo)
    // await pool.query(``);
    return;
};

module.exports = {
    getCategories,
    getSubcat, 
    getAnimalsInSubcat,
    getAllAnimals,
    deleteAnimal,
    getAnimalInfo,
    updateAnimal
}