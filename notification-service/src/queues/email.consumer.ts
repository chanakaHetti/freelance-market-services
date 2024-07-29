import { Channel, ConsumeMessage } from 'amqplib';
import { Logger } from 'winston';

import { winstonLogger } from '@notifications/common-helpers/winston-logger';
import { config } from '@notifications/config';
import { createConnection } from '@notifications/queues/connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'email consumer', 'debug');

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
    try {
        if (!channel) {
            channel = (await createConnection()) as Channel;
        }

        const exchangeName = 'jobber-email-notification';
        const routingKey = 'auth-email';
        const queueName = 'auth-email-queue';

        await channel.assertExchange(exchangeName, 'direct');
        const queue = await channel.assertQueue(exchangeName, { durable: true, autoDelete: false });
        await channel.bindQueue(queue.queue, exchangeName, routingKey);
        channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
            console.log(JSON.parse(msg!.content.toString()));
            // send emails
            // acknowledge
        });
    } catch (error) {
        log.log('error', 'Notification Service - Email Consumer consumeAuthEmailMessages() method error', error);
    }
}

export { consumeAuthEmailMessages };
