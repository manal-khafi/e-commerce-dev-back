const Role = require('../models/role');

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ error: 'Role name is required' });

    const newRole = await Role.create({ nom });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  try {
    const { nom } = req.body;
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });

    role.nom = nom || role.nom;
    await role.save();

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });

    await role.destroy();
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
