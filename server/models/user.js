// Import the DataType object from Sequelize
import { DataTypes } from 'sequelize';
// Import the Sequelize instance (connection) from the configuration file
import sequelize from '../config/connection.js';

// Define the model for the "users" table using sequelize.define()
const User = sequelize.define(
  'User',
  {
    // Define the 'id' attribute
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Primary key
      autoIncrement: true, // Auto-incrementing
    },
    // Define the 'name' attribute
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Must be provided, cannot be null
    },
    // Define the 'email' attribute
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Must be provided, cannot be null
      unique: true, // Must be unique across the table
      validate: { isEmail: true },
    },
    // Define the 'password' attribute — always stored as an argon2 hash,
    // never as plain text. See server/middleware/authentication.js.
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'age' attribute
    age: {
      type: DataTypes.INTEGER,
      allowNull: true, // Can be null
    },
    // Define the 'city' attribute
    city: {
      type: DataTypes.STRING,
      allowNull: true, // Can be null
    },
  },
  {
    tableName: 'users', // Specify the table name explicitly
    timestamps: true,
    defaultScope: {
      // Never return the password hash unless explicitly asked for.
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  }
);

// Export the User model
export default User;
