import { Request, Response } from 'express';
import SomeTextService from '../services/SomeTextService'
import { controller } from './index';



const index = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextService.index);

const show = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextService.show);

const create = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextService.save);

const update = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextService.save);

const remove = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextService.remove);

export default {
  index,
  show,
  create,
  update,
  remove,
};
