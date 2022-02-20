const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize('amigo', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

db.User = require('./User')(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
