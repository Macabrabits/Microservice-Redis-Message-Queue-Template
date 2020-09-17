import { Comment } from '../typeorm/entity/Comment';
import {RedisCli} from '../utilities/RedisCli'

interface iComment {
  id?: number;
  comment: string;
  save?: () => Promise<any>;
  remove?: () => Promise<any>;
}

const index = async (req: any) => {
  const where = req.query;
  return Comment.find({ order: { id: 'DESC' }, where });
};

const show = async (req: any) => {
  const id = req.params.id;
  const comment = await Comment.findOne(id);
  if (!comment) throw ['Comentário não encontrado.'];
  return comment;
};

const save = async (req: any, commentInjection?: iComment) => {
  const errors = [];
  const body = req.body;
  const id = req.params.id;
  return RedisCli.pub('microsvc','farofa')

  
};

const remove = async (req: any) => {
  const id = req.params.id;
  const comment = await Comment.findOne(id);
  if (!comment) throw ['Comentário não encontrado para exclusão.'];
  return await comment.remove();
};

export const CommentService = {
  index,
  show,
  save,
  remove,
};
