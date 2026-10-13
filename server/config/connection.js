// Load environment variables first, before anything below reads process.env.
// (This must happen here, not only in server/index.js — ES module imports are
// hoisted, so server/index.js's own dotenv.config() would run too late if this
// file is imported before it.)
import 'dotenv/config';
import { Sequelize } from 'sequelize';

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_DIALECT = 'mysql',
} = process.env;

if (!DB_NAME || !DB_USER) {
  throw new Error(
    'Missing database configuration. Copy server/.env.example to server/.env ' +
      'and fill in DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT.'
  );
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  logging: false,

  // Disable timestamps by default for all models (overridden per-model
  // where needed, e.g. the User model turns them back on).
  define: { timestamps: false },
});

export default sequelize;
