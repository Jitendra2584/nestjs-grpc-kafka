import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { databaseSetting } from './database.config';

// Load environment variables from .env file
config({ path: 'apps/api-gateway/.env' });

const dataSource: DataSource = new DataSource(databaseSetting(process.env));

export default dataSource;
