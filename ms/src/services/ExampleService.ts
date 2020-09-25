const double = async (req: any) => {
  const data = req.data

  if(!data.count) throw ['campo count é obrigatório']

  return data.count * 2
};

export default {
  double,
};
