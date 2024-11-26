// user-service/src/config/database.js
import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import { initializeModels } from '../models/index.js';
import bcrypt from 'bcrypt';

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

export const models = initializeModels(database, Sequelize);

export const tryConnectDatabase = async () => {
    try {
        await database.authenticate();
        console.log('Database is up');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};

export const initDatabase = async () => {
    try {
        const { User } = models;

        const adminPayload = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            password: 'poisson',
            role: ['ROLE_ADMIN', 'ROLE_CLIENT']
        };

        const existingAdmin = await User.findOne({ where: { email: adminPayload.email } });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPayload.password, 10);
            await User.create({ ...adminPayload, password: hashedPassword });
            console.log('Admin user created.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export const sync = async () => {
    database.sync({alter: true});
}