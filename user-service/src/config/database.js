import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();

export const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'db',
        dialect: 'mysql',
        logging: false,
        port: process.env.DB_PORT
    }
);

export const tryConnectDatabase = async () => {
    try {
        await database.authenticate();
        await database.sync();
        console.log('Database is up');
    } catch (error) {
        console.log(error);
    }
};