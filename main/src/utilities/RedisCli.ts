const redis = require('redis');
import config from '../config/redis';
import { v4 as uuidv4 } from 'uuid';

const redisClient = process.env.ENVIRONMENT !== 'test' ? redis.createClient(config) : null;

const getCache = async (key: string) =>
  new Promise((resolve, reject) =>
    redisClient.get(key, (err, value) => {
      if (value) resolve(JSON.parse(value));
      else reject('not cached');
    })
  );

const setCache = async (key: string, value: any, expireInSeconds?: number): Promise<any> => {
  const callback = (err, value) => {
    if (err) throw err;
  };
  expireInSeconds
    ? redisClient.set(key, JSON.stringify(value), 'EX', expireInSeconds, callback)
    : redisClient.set(key, JSON.stringify(value), callback);
  return value;
};

const getOrSet = (key: string, callback: () => any, expireInSeconds?: number): Promise<any> => {
  return new Promise(async resolve => {
    let value;

    try {
      value = await getCache(key);
      colorTrace(`Cache de ${key} utilizado`, 'green');
    } catch (err) {
      value = await callback();
      setCache(key, value, expireInSeconds);
      colorTrace(`Cache de ${key} não encontrado, novo cache realizado!`, 'blue');
    }
    resolve(value);
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    redisClient.keys('*', (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
};

const flushall = () => {
  return new Promise((resolve, reject) => {
    redisClient.flushall(err => {
      if (err) reject(err);
      else resolve('all flushed');
    });
  });
};

function colorTrace(msg, color) {
  console.log('%c' + msg, 'color:' + color + ';font-weight:bold;');
}

const pub = (channel: string, msg: any) =>
  new Promise((resolve, reject) => {    
    redisClient.publish(channel, msg, (err, qtdClients: number) => {      
      if (err) reject(err);
      resolve(qtdClients);
    });
  });

const rpush = (key: string, msg: any) =>
  new Promise((resolve, reject) => {
    msg = JSON.stringify(msg)
    redisClient.rpush(key, msg, (err, qtdClients: number) => {
      if (err) reject(err);
      resolve(qtdClients);
    });
  });

const rpop = (key: string) =>
  new Promise((resolve, reject) => {
    redisClient.rpop(key, (err, msg: string) => {
      if (err) reject(err);
      resolve(msg);
    });
  });

const brpop = (key: string, index: number) =>
  new Promise((resolve, reject) => {
    redisClient.brpop(key, index, (err, msg: string) => {
      if (err) reject(err);
      resolve(msg);
    });
  });

interface config {
  url: string,
  method: string,
  data?: any,
  params?: any,
  headers?: object,
}

const message = (channel: string, data: config) =>  
  new Promise((resolve, reject) => {
    const messageId = uuidv4()    
    const recursiveRpop = (messageId) => RedisCli.rpop(messageId).then(data => (data == null ? recursiveRpop(messageId) : data));
    rpush(messageId, data)
      .then(() => pub(channel, messageId))
      .then(() => recursiveRpop(`res:${messageId}`))
      .then(res => {
        res = JSON.parse(res);        
        if (res.status >= 300) reject(res.data);
        resolve(res.data);
      });
    

    // subscriber.on('message', (channel, message) => {
    //   RedisCli.rpop(messageId).then(res => {
    //     console.log(channel, message, res);        
    //     resolve(res);
    //   })
      
    // });

    setTimeout(() => reject('timeout'), 1000);
  });

const newSubscriber = (channel: string) => {
  const subscriber = redisClient.duplicate();
  subscriber.subscribe(channel);
  console.log('new subscriber: ' + channel)
  return subscriber;
};

const RedisCli = { getCache, setCache, getAll, flushall, getOrSet, pub, rpush, rpop, brpop, message, newSubscriber };

export { RedisCli };
