import { Request, Response } from 'express';
import { CommentService } from '../services/CommentService';
import { controller } from './index';

const create = async (req: Request, res: Response): Promise<Response> => controller(req, res, CommentService.save);

const update = async (req: Request, res: Response): Promise<Response> => controller(req, res, CommentService.save);

export const CommentController = {  
  create,
  update,  
};
