// index.js
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import express from 'express';
import { sync, initDatabase, tryConnectDatabase } from './config/database.js';
import { createUser, getAllUsers, getUserByEmail } from './repositories/user.repository.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

app.post('/users/register', async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    if (!firstname || typeof firstname !== 'string' || firstname.trim() === '') {
        return res.status(400).json({ error: 'Firstname is required and must be a valid string.'});
    }

    if (!lastname || typeof lastname !== 'string' || lastname.trim() === '') {
        return res.status(400).json({ error: 'Lastname is required and must be a valid string.'});
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Password is required and must be at least 6 characters long.'});
    }

    if (
        !email ||
        typeof email !== 'string' ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        return res.status(400).json({ error: 'Email is required and must be a valid email address.'});
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists.' });
    }

    const newUser = await createUser(firstname, lastname, email, password);
    if (!newUser) {
        return res.status(500).json({ error: 'Failed to create user.' });
    }

    console.log(newUser);
    res.status(201).json(newUser);

})

app.listen(process.env.USER_SERVICE_PORT, async () => {
    await tryConnectDatabase();
    await sync();
    await initDatabase();

    console.log("User service");
});