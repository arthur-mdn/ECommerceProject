import dotenv from 'dotenv';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();

app.use('/users', createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}:${process.env.USER_SERVICE_PORT}`,
    changeOrigin: true
}));

app.listen(process.env.API_GATEWAY_PORT, () => {
    console.log("API Gateway");
});