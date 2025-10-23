const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({
      where: { id: id }
    });

    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

// Public / User / Admin / Moderator endpoints
exports.allAccess = async (req, res) => res.status(200).send("Public Content.");
exports.userBoard = async (req, res) => res.status(200).send("User Content");
exports.adminBoard = async (req, res) => res.status(200).send("Admin Content.");
exports.moderatorBoard = async (req, res) => res.status(200).send("Moderator Content.");
