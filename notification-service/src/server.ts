import { Application } from 'express';
import 'express-async-errors';
import { Logger } from 'winston';
import http from 'http';

// import { winstonLogger } from '@chanakaHetti/freelance-market-shared';
import { winstonLogger } from './common-helpers/winston-logger';

import { config } from '@notifications/config';
import { healthRoutes } from '@notifications/routes';
import { checkConnection } from '@notifications/elasticserach';
import { createConnection } from '@notifications/queues/connection';

const SERVER_PORT = 4001;

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export function start(app: Application): void {
    startServer(app);

    app.use('', healthRoutes);

    startQueues();
    startElasticSearch();
}

async function startQueues(): Promise<void> {
    createConnection();
}

function startElasticSearch(): void {
    checkConnection();
}

function startServer(app: Application): void {
    try {
        const httpServer: http.Server = new http.Server(app);
        log.info(`Worker with process id of ${process.pid} on Notification Server has started`);
        httpServer.listen(SERVER_PORT, () => {
            log.info(`Notification server running on port ${SERVER_PORT}`);
        });
    } catch (error) {
        log.log('error', 'Notificatio Service startServer() method:', error);
    }
}
