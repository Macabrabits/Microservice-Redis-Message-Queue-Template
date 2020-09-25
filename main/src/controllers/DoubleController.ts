import { Request, Response } from 'express';
import DoubleService from '../services/DoubleService';
import { controller } from './index';

const double = async (req: Request, res: Response): Promise<Response> => controller(req, res, DoubleService.double);
const doubleHttp = async (req: Request, res: Response): Promise<Response> => controller(req, res, DoubleService.doubleHttp);

export default { double, doubleHttp };
