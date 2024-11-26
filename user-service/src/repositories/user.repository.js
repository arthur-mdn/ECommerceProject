// user.repository.js
import bcrypt from 'bcrypt'
import { models } from '../config/database.js';
const { User } = models;

export const createUser = async (firstname, lastname, email, password, role = false) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userPayload = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: hashedPassword
        };

        if (role) {
            userPayload.role = role;
        }

        return await User.create(userPayload);
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

export const getAllUsers = async () => {
    // return [
    //     {
    //         id: 1,
    //         name: "John Doe",
    //         email: "john.doe@test.fr"
    //     },
    //     {
    //         id: 2,
    //         name: "Jane Doe",
    //         email: "jane.doe@test.fr"
    //     }
    // ];
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};