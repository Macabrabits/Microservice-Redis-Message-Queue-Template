interface message {
  url: string;
  method: string;
  data: any;
}

type service = (data) => Promise<any>;

export default (RedisCli, service: service, message: message, messageId: string) =>
  service(message.data)
    .then(data => RedisCli.rpush(`res:${messageId}`, { status: data.status || 200, data }))
    .catch(err => RedisCli.rpush(`res:${messageId}`, { status: err.status || 400, data: err }));
