import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { Logger } from 'winston';

import { winstonLogger } from './common-helpers/winston-logger';

import { config } from '@notifications/config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationElasticsearchServer', 'debug');

const elasticsearchClient = new Client({
    node: `${config.ELASTIC_SEARCH_URL}`,
    auth: {
        username: config.ELASTIC_SEARCH_USERNAME as string,
        password: config.ELASTIC_SEARCH_PASSWORD as string
    }
});

export async function checkConnection(): Promise<void> {
    let isConnected = false;

    while (!isConnected) {
        try {
            const health: ClusterHealthResponse = await elasticsearchClient.cluster.health({});
            log.info(`Notification Service Elasticsearch health status - ${health.status}`);
            isConnected = true;
        } catch (error) {
            log.error('Connection to Elasticsearch failded. Retrying...');
            log.log('error', 'Notificatio Service checkConnection() method:', error);
        }
    }
}
