import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

module.exports = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/src/**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/src/**/migrations/*.{js,ts}`],
});
