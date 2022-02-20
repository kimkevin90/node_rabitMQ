const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize('productdb', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Product = require('./Product')(sequelize, Sequelize);

module.exports = db;
