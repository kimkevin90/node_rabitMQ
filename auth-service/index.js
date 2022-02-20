const express = require('express');

const app = express();
// const { Sequelize } = require('sequelize');
const PORT = process.env.PORT_ONE || 7070;
const { sequelize, User } = require('./models');


const jwt = require('jsonwebtoken');

app.use(express.json());

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.json({ message: "User doesn't exist" });
  }
  if (password !== user.password) {
    return res.json({ message: 'Password Incorrect' });
  }
  const payload = {
    email,
    name: user.name,
  };
  jwt.sign(payload, 'secret', (err, token) => {
    if (err) console.log(err);
    else return res.json({ token });
  });
});

app.post('/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.json({ message: 'User already exists' });
  }
  const newUser = new User({
    email,
    name,
    password,
  });
  await newUser.save();
  return res.json(newUser);
});


sequelize
  .sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });


app.listen(PORT, () => {
  console.log(`Product-Service at ${PORT}`);
});
