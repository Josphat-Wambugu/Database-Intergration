// Import the DataType object from Sequelize
import { DataTypes } from 'sequelize';
// Import the Sequelize instance (connection) from the configuration file
import sequelize from '../config/connection.js';
 
// Define the model for the "users" table using sequelize.define()
const User = sequelize.define('User', {
  // Define the 'id' attribute
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,         // Primary key
    autoIncrement: true       // Auto-incrementing
  },
  // Define the 'name' attribute
  name: {
    type: DataTypes.STRING,
    allowNull: false          // Must be provided, cannot be null
  },
  // Define the 'email' attribute
  email: {
    type: DataTypes.STRING,
    allowNull: false,         // Must be provided, cannot be null
    unique: true              // Must be unique across the table
  },
  // Define the 'age' attribute
  age: {
    type: DataTypes.INTEGER,
    allowNull: true           // Can be null
  },
  // Define the 'city' attribute
  city: {
    type: DataTypes.STRING,
    allowNull: true           // Can be null
  }
}, {
  tableName: 'users' ,        // Specify the table name explicitly
  timestamps: true
});
 
// Export the User model
export default User;