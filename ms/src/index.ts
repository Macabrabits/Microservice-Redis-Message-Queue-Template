const dotenv = require('dotenv').config().parsed;
process.env = { ...dotenv, ...process.env };
import 'reflect-metadata';
import { createConnection } from 'typeorm';
const redis = require('redis');
import config from './config/redis';
import { RedisCli } from './utilities/RedisCli';
import Controler from './utilities/controller';

import routes from './routes';

createConnection()
  .then(connection => {
    const subscriber = redis.createClient(config);

    subscriber.on('message', function (channel, messageId: string) {
      RedisCli.rpop(messageId).then((data: string) => {
        console.log(data);
        const message = JSON.parse(data);
        const url = routes[message.url];
        if (url == null) {
          RedisCli.rpush(`res:${messageId}`, { status: 400, data: { errors: ['Url inexistente'] } });
          return
        }

        const service = routes[message.url][message.method];        

        if (service == null) {
          RedisCli.rpush(`res:${messageId}`, { status: 400, data: { errors: ['Metodo inexistente'] } });
          return
        }

        Controler(RedisCli, service, message, messageId);
      });
    });

    subscriber.subscribe('ms');
    console.log('Aplication running');

    // }
  })
  .catch(error => console.log(error));
