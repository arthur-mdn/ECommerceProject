import { Sequelize } from "sequelize";

export const database = new Sequelize(
    'user-service',
    'root',
    '',
    {
        host: 'user-db',
        dialect: 'mysql',
        logging: false,
        port: 3306
    }
);

export const tryConnectDatabase = async () => {
    try {
        await database.authenticate();
        await database.sync();
        console.log('Database is up');
    } catch (error) {
        console.log(error)
    }
};