const dotenv = require('dotenv').config().parsed;
process.env = { ...dotenv, ...process.env };
import 'reflect-metadata';
import { createConnection } from 'typeorm';
const redis = require('redis');
import config from './config/redis';
import { RedisCli } from './utilities/RedisCli';

const double = (messageId) =>
  new Promise((resolve, reject) => {
    RedisCli.rpop(messageId).then((data: any) => {
      data = JSON.parse(data);
      RedisCli.rpush(messageId, data.count * 2).then(() => RedisCli.pub('main', messageId));

      resolve(data);
    });
  });

createConnection()
  .then(connection => {
    const subscriber = redis.createClient(config);

    subscriber.on('message', function (channel, message) {
      console.log(channel, message);

      double(message).then(data => console.log(data));
    });

    subscriber.subscribe('ms');
    console.log('Aplication running');

    // }
  })
  .catch(error => console.log(error));
