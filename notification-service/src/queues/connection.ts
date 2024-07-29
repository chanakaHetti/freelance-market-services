import client, { Channel, Connection } from 'amqplib';
import { Logger } from 'winston';

import { winstonLogger } from '@notifications/common-helpers/winston-logger';
import { config } from '@notifications/config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notification queue connection', 'debug');

async function createConnection(): Promise<Channel | undefined> {
    try {
        const connection: Connection = await client.connect(`${config.RABITMQ_ENDPOINT}`);
        const channel: Channel = await connection.createChannel();
        log.info('Notification server connected to Queue successfully...');
        closeConnection(channel, connection);
        return channel;
    } catch (error) {
        log.log('error', 'Notification Service error createConnection() method', error);
        return undefined;
    }
}

function closeConnection(channel: Channel, connection: Connection): void {
    process.once('SIGINT', async () => {
        await channel.close();
        await connection.close();
    });
}

export { createConnection };
