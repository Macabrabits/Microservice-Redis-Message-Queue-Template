import { RedisCli } from '../utilities/RedisCli';

const index = async (req: any) => {
  const data = req.query
  const config = {    
    url: `sometexts`,
    method: `get`,
    params: data,
  };
  console.log('redis')

  return RedisCli.message('ms', config); 
}

const show = async (req: any) => {  
  const config = {    
    url: "sometexts",
    method: "show",
    params: req.params
  };

  return RedisCli.message('ms', config); 
}

const save = async (req: any) => {  
  const config = {
    url: "sometexts",
    method: "post",
    data: req.body,
    params: req.params,
  };

  return RedisCli.message('ms', config); 
};

const remove = async (req: any) => {
  const config = {
    url: "sometexts",
    method: "delete",    
    params: req.params,
  };
    
  return RedisCli.message('ms', config); 
}

export default {
  index,
  show,
  save,
  remove,
};
