import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { controller } from './index';

const signin = async (req: Request, res: Response): Promise<Response> => controller(req, res, AuthService.signin);

const signup = async (req: Request, res: Response): Promise<Response> => controller(req, res, AuthService.signup);

export default {
  signin,
  signup  
};


