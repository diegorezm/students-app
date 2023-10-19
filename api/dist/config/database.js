"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _pg = require('pg');

require('dotenv').config();


 const client = new  (0, _pg.Client)({
  connectionString: process.env.DB_URL
}); exports.client = client;


exports.client.connect();

async function createTables() {
  try {
    await exports.client.query(`
      CREATE TABLE IF NOT EXISTS alunos (
        id serial PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        idade INTEGER,
        curso VARCHAR(255)
      );
    `);
    await exports.client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  } catch (err) {
    console.error('Error creating tables:', err);
  }
}
createTables();

