import User from '../models/user.js';
import { hashPassword } from '../middleware/authentication.js';

// Controller function to handle creating a new user
export const createUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, age, city, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Name, email and password are required.' });
    }

    // Never store the plain-text password — hash it first
    const hashedPassword = await hashPassword(password);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      age: age || null,
      city: city || null,
      password: hashedPassword,
    });

    // Respond with the newly created user data. NOTE: defaultScope only
    // strips the password column on queries (findAll/findOne) — the
    // instance returned by .create() still carries every attribute we
    // set, including the hash — so it must be stripped explicitly here.
    const { password: _omit, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    // Handle errors
    console.error('Error creating user:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(409)
        .json({ error: 'A user with that email already exists.' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res
        .status(400)
        .json({ error: error.errors.map((e) => e.message).join(', ') });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to handle fetching all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database (password excluded by defaultScope)
    const users = await User.findAll();

    // Respond with the fetched user data
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to handle fetching a single user by id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to handle updating a user
export const updateUser = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { id } = req.params;
    // Extract updated user data from the request body
    const { name, email, age, city, password } = req.body;

    // Use .unscoped() so we get a real instance we can call .update() on
    // even though the default scope hides the password column.
    const user = await User.unscoped().findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only touch fields that were actually sent, so a partial update
    // doesn't null out the rest of the row.
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (age !== undefined) updates.age = age;
    if (city !== undefined) updates.city = city;
    if (password) updates.password = await hashPassword(password);

    // Update the user in the database
    await user.update(updates);

    // Strip the password hash before sending the response back
    const { password: _omit, ...userWithoutPassword } = user.toJSON();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    // Handle errors
    console.error('Error updating user:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(409)
        .json({ error: 'A user with that email already exists.' });
    }
    if (error.name === 'SequelizeValidationError') {
      return res
        .status(400)
        .json({ error: error.errors.map((e) => e.message).join(', ') });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to handle deleting a user
export const deleteUser = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { id } = req.params;
    // Delete the user from the database
    const deletedCount = await User.destroy({ where: { id } });

    // Respond with a success message if user was deleted
    if (deletedCount) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      // Respond with an error message if a user is not found
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error deleting user:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
};
