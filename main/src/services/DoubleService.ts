import { RedisCli } from '../utilities/RedisCli';
const axios = require('axios')

const double = async (req: any) => {
  console.log('redis')
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

const doubleHttp = async (req: any) => {
  console.log('http')
  const body = req.body; 

  const config = {    
    url: `http://mshttp:3001/double`,
    data: body    
  };

  return axios(config).then(res => res.data);
};


export default { double, doubleHttp };
