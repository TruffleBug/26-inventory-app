const pool = require("./pool");

async function getCategories() {
    const { rows } = await pool.query('SELECT * FROM class');
    console.log('rows from db.queries: ', rows)
    // rows.forEach(e => {
    //     e.charAt(0).toUpperCase() + e.slice(1);
    // });
    return rows;
}

module.exports = {
    getCategories
}