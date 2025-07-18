/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const DBNAME = process.env.DATABASE_NAME;
const client = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: DBNAME,
});

async function ensureDatabaseExists(dbName: string) {
    await client.connect();
    const res = await client.query(
        `SELECT 1 FROM pg_database WHERE datname='${dbName}'`,
    );
    if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE ${dbName}`);
        console.log(`Database '${dbName}' created!`);
    } else {
        console.log(`Database '${dbName}' already exists.`);
    }
    await client.end();
}

ensureDatabaseExists(DBNAME);
