import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const db = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/entity/*.ts'],
  synchronize: true,
});

export default db;
