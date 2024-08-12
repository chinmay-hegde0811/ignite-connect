import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { Util } from '@ignite/ctintegration-util';
import jobRouter from './router/JobRouter';

dotenv.config();

const PORT = 8080;

// Create the express app
const app: Express = express();
app.disable('x-powered-by');

app.use('/cron', jobRouter);

// Listen the application
const server = app.listen(PORT, async () => {
  Util.Core.logger().info(`Job application listening on port ${PORT}`);
});

export default server;
