import dotenv from 'dotenv';
import express from 'express';
import { tryConnectDatabase } from './config/database.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.json([
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@test.fr"
        },
        {
            id: 2,
            name: "Jane Doe",
            email: "jane.doe@test.fr"
        }
    ]);
});

app.post('/register', (req, res) => {
    res.json({
        id: 3,
        name: "John Doe",
        email: "a@a.a",
        password: "123456"
    });
})

app.listen(process.env.USER_SERVICE_PORT, () => {
    tryConnectDatabase();
    console.log("User service");
});