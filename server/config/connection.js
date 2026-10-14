
import 'dotenv/config';
import { Sequelize } from 'sequelize';

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST ,
  DB_PORT ,
  DB_DIALECT = 'mysql',
} = process.env;

if (!DB_NAME || !DB_USER) {
  throw new Error(
    'Missing database configuration.'
  );
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  logging: false,


  define: { timestamps: false },
});

export default sequelize;
