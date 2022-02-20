const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize('orderdb', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Order = require('./Order')(sequelize, Sequelize);

module.exports = db;
