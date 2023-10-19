import { Client } from 'pg';

require('dotenv').config();


export const client = new  Client({
  connectionString: process.env.DB_URL
});


client.connect();

async function createTables() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id serial PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        age INTEGER,
        course VARCHAR(255)
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        profile_pic VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
  } catch (err) {
    console.error('Error creating tables:', err);
  }
}
createTables();

