const { Pool } = require('pg');
require("dotenv").config();

module.exports = new Pool({
	host: 'localhost', 
	user: process.env.user,
	database: process.env.db_name,
	password: process.env.password,
	port: 5432, 
});