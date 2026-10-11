// Controller function to handle creating a new user

 export const createUser = async (req, res) => {

  try {

    // Extract user data from request body

    const { name, email, age, city } = req.body;

    // Create a new user in the database

    const newUser = await User.create(req.body);

    // Respond with the newly created user data

    res.status(201).json(req.body);

  } catch (error) {

    // Handle errors

    console.error('Error creating user:', error);

    res.status(500).json({ error: 'Internal server error' });

  }

 }


 // Controller function to handle fetching all users

 export const getAllUsers = async (req, res) => {

  try {

    // Fetch all users from the database

    const users = await User.findAll();

    // Respond with the fetched user data

    res.status(200).json(users);

  } catch (error) {

    // Handle errors

    console.error('Error fetching users:', error);

    res.status(500).json({ error: 'Internal server error' });

  }

}

// Controller function to handle updating a user

 export const updateUser = async (req, res) => {

   try {

     // Extract user ID from request parameters

     const { id } = req.params;

     // Extract updated user data from the request body

     const { name, email, age, city } = req.body;

     // Update the user in the database

     const updatedUser = await User.update(

     { name, email, age, city },

     { where: { id } }

   );

        

   } catch (error) {

     // Handle errors

     console.error('Error updating user:', error);

     res.status(500).json({ error: 'Internal server error' });

   }

 }




 // Controller function to handle deleting a user

 export const deleteUser = async (req, res) => {

  try {

  // Extract user ID from request parameters

  const { id} = req.params;

  // Delete the user from the database

  const deletedUser = await User.destroy({ where: { id} });

  // Respond with a success message if user was deleted

  if (deletedUser) {

    res.status(200).json({ message: "User deleted successfully" });

  } else {

    // Respond with an error message if a user is not found

   res.status(404).json({ error: "User not found" });

  }

  } catch (error) {

    // Handle errors

    console.error('Error deleting user:', error);

    res.status(500).json({ error: 'Internal server error' });

  }

 }