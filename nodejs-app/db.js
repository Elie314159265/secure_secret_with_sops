const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'node_user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'node_app_db',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

