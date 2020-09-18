const double = async (data: { count: number }) => {

  if(!data.count) throw ['campo count é obrigatório']

  return data.count * 2
};

export default {
  double,
};
