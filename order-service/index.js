const express = require('express');

const app = express();
const PORT = process.env.PORT_ONE || 9090;
const { sequelize } = require('./models');
const amqp = require('amqplib');

const { Order } = require('./models');

let channel,
  connection;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

async function createOrder(products, userEmail) {
  let total = 0;
  for (let t = 0; t < products.length; ++t) {
    total += products[t].price;
  }
  const newOrder = new Order({
    products: JSON.stringify(products),
    user: userEmail,
    total_price: total,
  });
  await newOrder.save();
  return newOrder;
}

async function connect() {
  const amqpServer = 'amqp://localhost:5672';
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue('ORDER');
}
connect().then(() => {
  channel.consume('ORDER', async (data) => {
    console.log('Consuming ORDER service');
    const { products, userEmail } = JSON.parse(data.content);
    const newOrder = await createOrder(products, userEmail);
    channel.ack(data);
    channel.sendToQueue(
      'PRODUCT',
      Buffer.from(JSON.stringify({ newOrder })),
    );
  });
});

app.listen(PORT, () => {
  console.log(`Order-Service at ${PORT}`);
});
