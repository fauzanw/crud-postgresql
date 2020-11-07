const bodyParser = require('body-parser');
const express = require('express');
const route = require('./route');
const app = express();
const {
    APP_HOST = process.env.APP_HOST || 'localhost',
    APP_PORT = process.env.APP_PORT || 8080,
} = process.env;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

route(app);

app.listen(APP_PORT, APP_HOST, () => console.log(`[LOG] Server running on http://${APP_HOST}:${APP_PORT}`))