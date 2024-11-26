import { defineUserModel } from './user.model.js';

export const initializeModels = (sequelize, Sequelize) => {
    const User = defineUserModel(sequelize, Sequelize);
    return { User };
};