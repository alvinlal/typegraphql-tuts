import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const testConn = (drop: boolean = false) => {
  return new DataSource({
    type: 'mysql',
    host: process.env.TEST_DB_HOST,
    port: +process.env.TEST_DB_PORT!,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    entities: ['src/entity/*.ts'],
    synchronize: drop,
    dropSchema: drop,
  });
};

export default testConn;
