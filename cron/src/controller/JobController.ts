import { Request, Response } from 'express';
import core from '../core';

const cron = async (_request: Request, response: Response) => {
  try {
    await core.cronJob();
    response.status(200).send();
  } catch (error) {
    response.status(500).json({
      message: 'Internal server error - Failed to execute cron job.',
      statusCode: 500,
    });
  }
};

export default cron;
