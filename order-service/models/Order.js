module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('order', {
    products: {
      type: DataTypes.STRING,
    },
    user: {
      type: DataTypes.STRING,
    },
    total_price: {
      type: DataTypes.INTEGER,
    },
  });

  return User;
};

