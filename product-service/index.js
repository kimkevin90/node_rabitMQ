const express = require('express');

const app = express();
// const { Sequelize } = require('sequelize');
const PORT = process.env.PORT_ONE || 8080;
const { sequelize } = require('./models');
const amqp = require('amqplib');

const { Product } = require('./models');
const isAuthenticated = require('../isAuthenticated');

const { Op } = require('sequelize');

let order;

let channel,
  connection;

app.use(express.json());


sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

async function connect() {
  const amqpServer = 'amqp://localhost:5672';
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue('PRODUCT');
}
connect();

app.post('/product/buy', isAuthenticated, async (req, res) => {
  const { ids } = req.body;
  const products = await Product.findAll({
    where: { id: { [Op.in]: ids } },
  });
  channel.sendToQueue(
    'ORDER',
    Buffer.from(
      JSON.stringify({
        products,
        userEmail: req.user.email,
      }),
    ),
  );
  channel.consume('PRODUCT', (data) => {
    console.log('Consume Product');
    order = JSON.parse(data.content);
    channel.ack(data);
  });
  return res.json(order);
});

app.post('/product/create', isAuthenticated, async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
  });
  await newProduct.save();
  return res.json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Product-Service at ${PORT}`);
});
