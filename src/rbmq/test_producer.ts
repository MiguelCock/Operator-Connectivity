import amqplib from 'amqplib';
import { AuthenticateDocument } from '../types/gov';

const queue = 'authenticateDoc';

async function sendMessage() {
  // 1. Connect to RabbitMQ
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // 2. Ensure the queue exists
  await channel.assertQueue(queue, { durable: false });

  // 3. Send a message
  const message: AuthenticateDocument = {
    idCitizen: 1234123,
    UrlDocument: "http://bucket.com/algo.pdf",
    documentTitle: "algo.pdf"
  };

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

  console.log(`📤 Sent: ${message}`);

  // 4. Close connection after a short delay
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

sendMessage().catch(console.error);
