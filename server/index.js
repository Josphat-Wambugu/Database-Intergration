import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/connection.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

// 404 for anything else
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Centralized error handler — must be registered last, and must keep all
// four arguments so Express recognizes it as an error handler.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Fail fast with a clear message if the database is unreachable or
    // misconfigured, instead of only discovering it on the first request.
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Create/update tables to match the models. Fine for local
    // development; swap for real migrations before production use.
    await sequelize.sync();
    console.log('Models synchronized with the database.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
};

start();
