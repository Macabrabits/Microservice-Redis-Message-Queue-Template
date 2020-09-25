import { RedisCli } from '../utilities/RedisCli';

const double = async (req: any) => {
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

export default { double };
