const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendingMail  = require("../nodemailer/mailing");

// Signup controller
exports.signup = async (req, res) => {
  try {
    // Check for duplicate email
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use!" });
    }

    let role = await Role.findOne({ where: { nom: 'user' } });
    if (!role) {
      return res.status(500).json({ message: "Default role not found!" });
    }

    const { nom, email, mot_de_passe } = req.body;
    // hashed password
    const user = await User.create({
      nom: req.body.nom,
      email: req.body.email,
      mot_de_passe: bcrypt.hashSync(req.body.mot_de_passe, 8),
      adresse: req.body.adresse,
      idRole: role.id
    });


    const token = jwt.sign(
      { id: user.id },
      config.secret,
      { algorithm: 'HS256', expiresIn: 86400 }
    );

    //verifiaction link
    const verificationLink = `http://localhost:3000/api/auth/verify/${token}`;

    // Send verification email
    await sendingMail(
      user.email,
      "Verify your email",
      `Hello ${user.nom},\n\nPlease verify your email by clicking the link: ${verificationLink}\n\nThank you!`
    );

    res.status(201).json({ 
        message: "User registered successfully! Check your email for verification link.",
        accessToken: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signin controller
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { nom: req.body.nom } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    const passwordIsValid = bcrypt.compareSync(req.body.mot_de_passe, user.mot_de_passe);
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid password!"
      });
    }

    const roles = await Role.findByPk(user.idRole);
    const authorities = roles ? ["ROLE_" + roles.nom.toUpperCase()] : [];

    const accessToken = jwt.sign(
        { id: user.id, roles: authorities },
        config.secret,
        { algorithm: 'HS256', expiresIn: '15m' } 
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      config.secret,
      { algorithm: 'HS256', expiresIn: '7d' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,     
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 7 *24 * 60 * 60 * 1000,
      sameSite: 'Strict', 
    });

    res.status(200).json({
      id: user.id,
      nom: user.nom,
      email: user.email,
      roles: authorities,
      accessToken
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh token controller
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    const decoded = jwt.verify(refreshToken, config.secret);
    const user = await User.findByPk(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid Refresh Token!" });
    }
    const roles = await Role.findByPk(user.idRole);
    const authorities = roles ? ["ROLE_" + roles.nom.toUpperCase()] : [];

    const newAccessToken = jwt.sign(
      { id: user.id, roles: authorities },
      config.secret,
      { algorithm: 'HS256', expiresIn: '15m' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid Refresh Token!" });
  }
};

// Logout controller
exports.logout = async (req, res) => {
  const refreshToken  = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh Token is required!" });
  }
  try {
    const decoded = jwt.verify(refreshToken, config.secret);
    const user = await User.findByPk(decoded.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    return res.status(403).json({ message: "Invalid Refresh Token!" });
  }
};

// Email verification controller
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    if(!token) {
      return res.status(400).json({ message: "Verification token is missing!" });
    }
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isverified) {
      return res.status(400).json({ message: "Email is already verified." });
    }
    user.isverified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//test email
exports.testEmail = async (req, res) => {
  try {
    await sendingMail(
      req.body.to,
      req.body.subject,
      req.body.text
    );
    res.status(200).json({ message: "Test email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}