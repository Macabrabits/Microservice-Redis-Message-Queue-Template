import { Request, Response } from 'express';
import DoubleService from '../services/DoubleService'
import { controller } from './index';



const double = async (req: Request, res: Response): Promise<Response> => controller(req, res, DoubleService.double);

export default {
  double  
};
