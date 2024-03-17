const {
  Pool,
} = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
async function getPricingFromDatabase(zone, organization_id) {
  try {
    const query = 'SELECT * FROM pricing WHERE zone = $1 AND organization_id = $2';
    const values = [zone, organization_id];
    const {
      rows,
    } = await pool.query(query, values);

    if (rows.length === 0) {
      throw new Error('No pricing information found for the provided zone and organization ID');
    }

    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getPricingFromDatabase,
};
