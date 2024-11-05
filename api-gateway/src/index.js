import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/users', createProxyMiddleware({
    target: 'http://user-service:3001/',
    changeOrigin: true
}));

app.listen(3000, () => {
    console.log("APi Gateway");
});
