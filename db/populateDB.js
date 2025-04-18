#! /usr/bin/env node

const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS class (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100)
);

INSERT INTO class (name) VALUES 
	('fish'), 
	('amphibian'), 
	('reptile'), 
	('bird'), 
	('mammal');

CREATE TABLE IF NOT EXISTS color (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100)
);

INSERT INTO color (name) VALUES 
    ('green'),
    ('grey'),
    ('brown'),
    ('white'),
    ('black'),
    ('yellow');

CREATE TABLE IF NOT EXISTS size (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100)
);

INSERT INTO size (name) VALUES
	('tiny'),
	('small'),
	('medium'),
	('large'),
	('giant');

CREATE TABLE IF NOT EXISTS animals (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(100),
	class INT REFERENCES class(id),
	color INT REFERENCES color(id),
	size INT REFERENCES size(id),
	quantity SMALLINT
);

INSERT INTO animals (name, class, color, size, quantity) VALUES 
	('Tree Frog', 2, 1, 1, 362),
	('Cane Toad', 2, 3, 1, 1),
	('Camel', 5, 3, 5, 32),
	('Giraffe', 5, 3, 5, 61),
	('Green Snake', 3, 1, 2, 24),
	('King Cobra', 3, 3, 2, 20),
	('Snowy Owl', 4, 4, 2, 3),
	('Bass', 1, 1, 2, 13),
	('Perch', 1, 1, 2, 5),
	('Crow', 4, 5, 2, 60),
	('Hippopotamus', 5, 2, 5, 12),
	('Bison', 5, 3, 5, 25),
	('Ibis', 4, 4, 3, 2),
	('Lion', 5, 6, 4, 16),
	('Ostrich', 4, 5, 4, 8);
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: `postgresql://${process.env.user}:${process.env.password}@localhost:5432/${process.env.db_name}`,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
}

main();