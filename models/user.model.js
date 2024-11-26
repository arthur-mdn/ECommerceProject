// user-service/src/models/user.model.js
export const defineUserModel = (sequelize, Sequelize) => {
    return sequelize.define('User', {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: ['ROLE_CLIENT']
        }
    });
};