import { RedisCli } from '../utilities/RedisCli';


const signin = async (req: any) => {
  const body = req.body;  

  const config = {
    // headers: tokenHeader,
    url: `signin`,
    method: `get`,
    data: body,
  };

  return RedisCli.message('ms', config); 
};

const signup = async (req: any) => {
  const body = req.body;  
  

  const config = {
    // headers: tokenHeader,
    url: `signup`,
    method: `post`,
    data: body,
  };
    

  return RedisCli.message('ms', config); 
};

export default  { signin, signup };
