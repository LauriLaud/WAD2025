 // database.js
const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "root",
    database: "wad",
    host: "localhost",
    port: "5433"
});

const execute = async (query) => {
  try {
    await pool.query(query);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

const createTablesQuery = `
  CREATE EXTENSION IF NOT EXISTS "pgcrypto";

  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );
`;

execute(createTablesQuery).then((result) => {
  if (result) {
    console.log('Created users and posts tables');
  }
});

module.exports = pool;