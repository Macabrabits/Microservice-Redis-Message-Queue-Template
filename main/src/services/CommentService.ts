import { Comment } from '../typeorm/entity/Comment';
import { RedisCli } from '../utilities/RedisCli';


const save = async (req: any) => {
  const body = req.body;
  const id = req.params.id;  

  const config = {
    // headers: tokenHeader,
    url: `double`,
    method: `get`,
    data: body,
  };
    

  return RedisCli.message('ms', config); 
};

export const CommentService = {
  save,
};
