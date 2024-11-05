import express from 'express';
import { tryConnectDatabase } from './config/database.js';

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

app.listen(3001, () => {
    tryConnectDatabase();
    console.log("User service");
});
