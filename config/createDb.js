const { Client } = require('pg');
require('dotenv').config();

const createDatabase = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();
    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [process.env.DB_NAME]
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
      console.log(`Database ${process.env.DB_NAME} berhasil dibuat`);
    } else {
      console.log(`Database ${process.env.DB_NAME} sudah ada`);
    }
  } finally {
    await client.end();
  }
};

module.exports = createDatabase;
