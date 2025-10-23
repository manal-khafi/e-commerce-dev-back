const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded)=> {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.userId, { include: ['role'] });
    if (user.role && user.role.nom === 'admin') {
        next();
        return;
    }
    res.status(403).send({ message: "Require Admin Role!" });
};

isModerator = async (req, res, next) => {
    const user = await User.findByPk(req.userId, { include: ['role'] });
    if (user.role && user.role.nom === 'moderator') {
        next();
        return;
    }
    res.status(403).send({ message: "Require Moderator Role!" });
};

isModeratorOrAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.userId, { include: ['role'] });
    if (user.role && (user.role.nom === 'moderator' || user.role.nom === 'admin')) {
        next();
        return;
    }
    res.status(403).send({ message: "Require Moderator or Admin Role!" });
};

const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJWT;