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
        SELECT id, name, quantity FROM animals
        WHERE ${category} = 
        (SELECT id FROM ${category} WHERE name LIKE '${subcat}') ORDER BY name ASC;`);
    return rows;
};

async function getAnimalById(animalId) {
    const { rows } = await pool.query(`
        SELECT animals.id, animals.name, class.name AS class, color.name AS color, size.name AS size, animals.quantity FROM animals 
        JOIN class ON animals.class = class.id
        JOIN color ON animals.color = color.id
        JOIN size ON animals.size = size.id
        WHERE animals.id='${animalId}';`);
    return rows;
};

async function getAllAnimals() {
    const { rows } = await pool.query(`SELECT id, name, quantity FROM animals ORDER BY name ASC;`);
    return rows;
};

async function deleteAnimal(animalId) {
    await pool.query(`DELETE FROM animals WHERE id=${animalId};`);
    return;
};

async function updateAnimal(animalId, newName, newClass, newColor, newSize, newQuantity) {
    console.log('animalId: ', animalId)
    await pool.query(`
        UPDATE animals
        SET name = '${newName}',
        class = (SELECT id FROM class WHERE name='${newClass}'), 
        color = (SELECT id FROM color WHERE name='${newColor}'),  
        size = (SELECT id FROM size WHERE name='${newSize}'), 
        quantity = ${newQuantity}
        WHERE id = ${animalId};`);
    return;
};

async function postNewAnimal(info) {
    let nameFormatted = info.enterName.charAt(0).toUpperCase() + info.enterName.slice(1);
    await pool.query(`
        INSERT INTO animals (name, class, color, size, quantity)
        VALUES (
            '${nameFormatted}', 
            (SELECT id FROM class WHERE name='${info.enterClass}'),
            (SELECT id FROM color WHERE name='${info.enterColor}'),
            (SELECT id FROM size WHERE name='${info.enterSize}'),
            ${info.enterQuantity}
        );`)
    return;
};

module.exports = {
    getCategories,
    getSubcat, 
    getAnimalsInSubcat,
    getAnimalById,
    getAllAnimals,
    deleteAnimal,
    updateAnimal,
    postNewAnimal
}