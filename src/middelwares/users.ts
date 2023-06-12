import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { authMethods } from './authuntication';
import { userControllers } from '../controllers/users';

dotenv.config();

const createUser = async (req: Request, res: Response) : Promise<Response> => {
  const {
    fullName, email, userName, image,
  } = req.body;
  let { password } = req.body;

  password = authMethods.hashPassword(password);

  const user = await userControllers.creat({
    fullName, password, email, userName, image,
  });

  if (!user) throw new Error('Error: user is not created');

  return res.status(200).json(user);
};

export const userMiddelwares = {
  createUser,
};
