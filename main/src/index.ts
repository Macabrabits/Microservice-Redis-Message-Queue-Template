const dotenv = require('dotenv').config().parsed;
process.env = { ...dotenv, ...process.env };


import express = require('express');
import router from './routes';
import bodyParser = require('body-parser');
import cors = require('cors');
import { RedisCli } from './utilities/RedisCli';

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app = router(app);
process.env.subscriber = RedisCli.newSubscriber('main');

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => console.log(`Application running on port: ${port}`));
