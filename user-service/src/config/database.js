// user-service/src/config/database.js
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import { defineUserModel } from '../models/user.model.js';

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

const User = defineUserModel(database, Sequelize);

export const tryConnectDatabase = async () => {
    try {
        await database.authenticate(); 
        await database.sync();
        console.log('Database is up');
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async (name, email) => {
    try {
        const user = await User.create({ name, email });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};