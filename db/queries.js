const pool = require("./pool");

async function getCategories() {
    let { rows } = await pool.query(`
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema='public' 
        AND table_type='BASE TABLE' 
        ORDER BY table_name ASC;`);
    rows = rows.filter(row => row.table_name !== 'animals');
    return rows;
}

// async function getSubcat() {
//     const { rows } = await pool.query(`
//         SELECT name, 'class' AS tablename FROM class
//         UNION
//         SELECT name, 'color' AS tablename FROM color
//         UNION
//         SELECT name, 'size' AS tablename FROM size
//         ORDER BY name ASC`);
//     return rows;
// }

async function getSubcat(category) {
    const { rows } = await pool.query(`SELECT name FROM ${category} ORDER BY name ASC;`);
    return rows;
}

async function getAnimalsInSubcat(category, subcat) {
    const { rows } = await pool.query(`
        SELECT name, quantity FROM animals
        WHERE ${category} = 
        (SELECT id FROM ${category} WHERE name LIKE '${subcat}')`);
    return rows;
}

async function getAllAnimals() {
    const { rows } = await pool.query(`SELECT name, quantity FROM animals ORDER BY name ASC;`);
    return rows;
}

module.exports = {
    getCategories,
    getSubcat, 
    getAnimalsInSubcat,
    getAllAnimals
}