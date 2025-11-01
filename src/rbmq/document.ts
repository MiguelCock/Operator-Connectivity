import amqplib from 'amqplib';
import { AuthenticateDocumentSchema, AuthenticateDocument } from '../types/gov';
import { Value } from '@sinclair/typebox/value';
import { authenticateDocument } from '../gov/authenticate_doc';

const queue = 'authenticateDoc';

export async function handler() {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });

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

      // Handle response from your service
      const responseCode = await authenticateDocument(message);
      console.log('📩 Response code:', responseCode);

      switch (responseCode) {
        case 200:
        case 204:
          console.log('✅ Successfully processed, acking message');
          channel.ack(msg);
          break;

        case 501:
          console.warn('⚠️ Wrong parameters, rejecting message');
          channel.nack(msg, false, false); // don't requeue
          break;

        case 502:
          console.warn('🚨 Teacher server down, requeuing message');
          channel.nack(msg, false, true); // requeue for retry
          break;

        case 500:
        default:
          console.error('❌ Internal error, rejecting message');
          channel.nack(msg, false, false);
          break;
      }
    } catch (err) {
      console.error('❌ Error parsing or handling message:', err);
      channel.nack(msg, false, false);
    }
  });
}
