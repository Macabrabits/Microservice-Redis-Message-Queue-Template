import { SomeText } from '../typeorm/entity/SomeText';

const index = async (req: any) => {
  const where = req.params;  
  return SomeText.find({ order: { id: 'DESC' }, where });
};

const show = async (req: { params: { id: any } }) => {
  const id = req.params.id;
  const someText: any = await SomeText.findOne(id);
  if (!someText) throw ['Texto não encontrado.'];
  return someText;
};

const save = async (req: { body: any; params: { id?: any } }) => {
  const errors = [];
  const body = req.body;
  const id = req.params.id;  

  const dbSomeText = async () => (id ? SomeText.findOne(id) : new SomeText());

  if (!id) {
    if (!id && !body.name) throw ['O campo "name" é obrigatório.'];
  }  

  const someText = await dbSomeText();
  if (!someText) throw ['Texto não encontrado para edição.'];

  if (errors.length) throw errors;

  for (let field of Object.keys(body)) someText[field] = body[field];

  
  return await someText.save();
};

const remove = async (req: any) => {
  const id = req.params.id;
  const someText = await SomeText.findOne(id);
  if (!someText) throw ['Texto não encontrado para exclusão.'];
  return someText.remove();
};

export default {
  index,
  show,
  save,
  remove,
};



