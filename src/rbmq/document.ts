import amqplib from 'amqplib';
import { AuthenticateDocumentSchema, AuthenticateDocument } from '../types/gov';
import { Value } from '@sinclair/typebox/value';
import { authenticateDocument } from '../gov/authenticate_doc';
import { RedisClient } from "bun";

const queue = 'authenticateDoc';
const hasher = new Bun.CryptoHasher("sha256");
const TTL_SECONDS = 60 * 5; // 5 minutes TTL for Redis keys

export async function handler() {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });

  const client = new RedisClient();

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      // Parse message
      const raw = msg.content.toString();
      const parsed = JSON.parse(raw);

      // ✅ Validate runtime structure using TypeBox
      const isValid = Value.Check(AuthenticateDocumentSchema, parsed);
      if (!isValid) {
        const errors = [...Value.Errors(AuthenticateDocumentSchema, parsed)];
        console.error('❌ Invalid message:', errors);
        channel.nack(msg, false, false); // reject message (don't requeue)
        return;
      }

      const message: AuthenticateDocument = parsed;
      console.log('✅ Valid message:', message);

      hasher.update(message.documentTitle);
      const requestId = hasher.digest("hex");

      const exist = await client.get(requestId);
      var responseCode: number;

      if (exist != null) {
        responseCode = Number.parseInt(exist, 10);
      } else {
        responseCode = await authenticateDocument(message);
        client.setex(requestId, TTL_SECONDS, String(responseCode));
      }

      switch (responseCode) {
        case 200:
          console.log('✅ Successfully processed, acking message');
          channel.ack(msg);
          await client.del(requestId);
          break;
        case 204:
          console.warn('⚠️ Coulnt not validate document');
          channel.nack(msg, false, false); // don't requeue
          await client.del(requestId);
          break;

        case 501:
          console.warn('⚠️ Wrong parameters, rejecting message');
          channel.nack(msg, false, false); // don't requeue
          await client.del(requestId);
          break;

        case 502:
          console.warn('🚨 Teacher server down, requeuing message');
          channel.nack(msg, false, true); // requeue for retry
          break;

        case 500:
        default:
          console.error('❌ Internal error, rejecting message');
          channel.nack(msg, false, false);
          await client.del(requestId);
          break;
      }
    } catch (err) {
      console.error('❌ Error parsing or handling message:', err);
      channel.nack(msg, false, false);
    }
  });
}
