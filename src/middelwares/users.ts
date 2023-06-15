import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { authMethods } from './authuntication';
import { userControllers } from '../controllers/users';

dotenv.config();

// data types
type UpdteUserData = {
  fullName?: string,
  password?: string,
  email?: string,
  userName?: string,
  image?: string
};

const createUser = async (req: Request, res: Response) : Promise<Response> => {
  const {
    fullName, email, userName, image,
  } = req.body;
  let { password } = req.body;

  console.log('data');
  console.log(fullName, email, userName, image, password);

  password = authMethods.hashPassword(password);

  const user = await userControllers.creat({
    fullName, password, email, userName, image,
  });

  if (!user) throw new Error('1');

  return res.status(200).json(user);
};

const updateUserFunc = async (req: Request, res: Response) => {
  // if (!req.params.id) throw new Error('3');
  const { id } = req.params;

  console.log(`id ${id}`);

  const {
    fullName, email, userName, image,
  } = req.body;

  console.log(fullName, email, userName, image, id);

  let { password } = req.body;

  if (password) {
    password = authMethods.hashPassword(password);
  }

  const updateObject: UpdteUserData = {
    fullName, email, userName, image, password,
  };

  if (Object.values(updateObject).every((value) => value === undefined)) {
    throw new Error('3');
  }

  const newUser = await userControllers.updateUser(id, updateObject);

  if (!newUser) throw new Error('4');

  return res.status(200).json(newUser);
};

export const userMiddelwares = {
  createUser,
  updateUserFunc,
};
