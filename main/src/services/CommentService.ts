import { Comment } from '../typeorm/entity/Comment';
import { RedisCli } from '../utilities/RedisCli';


const save = async (req: any) => {
  const body = req.body;
  const id = req.params.id;

  console.log('save !!')  
    

  const res = await RedisCli.message(process.env.subscriber, body);
  
  return res;

  // RedisCli.rpush('main', JSON.stringify(body));
  // RedisCli.pub('ms', 'main');

  const rpop = () => RedisCli.rpop('ms').then(data => (data == null ? rpop() : data));

  return rpop();
};

export const CommentService = {
  save,
};
