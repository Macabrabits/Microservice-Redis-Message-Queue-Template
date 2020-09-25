import { Request, Response } from 'express';
import CommentService from '../services/ExampleService';
import { controller } from './index';

const double = async (req: Request, res: Response): Promise<Response> => controller(req, res, CommentService.double);

export default { double };
