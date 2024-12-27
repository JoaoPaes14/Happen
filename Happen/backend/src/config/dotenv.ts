import dotenv from 'dotenv';

dotenv.config();


interface EnvConfig {
  PORT: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}


const envConfig: EnvConfig = {
  PORT: process.env.PORT || '3000',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || '3306',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '1234',
  DB_NAME: process.env.DB_NAME || 'happen',
  JWT_SECRET: process.env.JWT_SECRET || 'bia',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
};

export default envConfig;
