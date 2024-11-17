import dotenv from 'dotenv';

dotenv.config();

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '3600',
  SERVER_PORT: process.env.SERVER_PORT || 3000,
};
