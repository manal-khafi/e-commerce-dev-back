const { Sequelize } = require('sequelize');



/*const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://myuser:root@localhost:5400/mydatabase')*/

const sequelize = new Sequelize('mydatabase', 'myuser', 'root', {
  host: 'localhost',
  port: 5400,
  dialect: 'postgres'
});

module.exports = sequelize;
