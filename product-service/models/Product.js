module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  });

  return User;
};

