import express, { Express } from 'express';
import { start } from '@notifications/server';

function initilize(): void {
    const app: Express = express();
    start(app);
}

initilize();
