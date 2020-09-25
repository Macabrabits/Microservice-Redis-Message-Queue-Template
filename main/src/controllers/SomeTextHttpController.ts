import { Request, Response } from 'express';
import SomeTextHttpService from '../services/SomeTextHttpService'
import { controller } from './index';



const index = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextHttpService.index);

const show = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextHttpService.show);

const create = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextHttpService.save);

const update = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextHttpService.save);

const remove = async (req: Request, res: Response): Promise<Response> => controller(req, res, SomeTextHttpService.remove);

export default {
  index,
  show,
  create,
  update,
  remove,
};
