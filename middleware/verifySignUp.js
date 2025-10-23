const db = require('../models');
const User = db.user;
const Role = db.role;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Name
  const user = await User.findOne({ where: { nom: req.body.nom } });
  if (user) return res.status(400).send({ message: "Failed! Name is already in use!" });

  // Email
  const email = await User.findOne({ where: { email: req.body.email } });
  if (email) return res.status(400).send({ message: "Failed! Email is already in use!" });

  next();
};

checkRoleExisted = async (req, res, next) => {
  const roleName = req.body.role || 'user'; 
  const role = await Role.findOne({ where: { nom: roleName } });
  if (!role) return res.status(400).send({ message: `Failed! Role ${roleName} does not exist!` });
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted
};

module.exports = verifySignUp;