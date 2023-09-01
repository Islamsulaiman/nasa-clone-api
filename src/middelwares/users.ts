import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import crypto from 'crypto';
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
  const { id } = req.params;

  const {
    fullName, email, userName, image,
  } = req.body;

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

const getUserFavorite = async (req: Request, res: Response) => {
  const { userId } = req.query;

  const favorites = await userControllers.getUserFavorites(userId as string);
  return res.status(200).send(favorites);
};

const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  // check email
  const checkEmail = await userControllers.resetPassword(email);

  if (email) {
    const randomToken = crypto.randomBytes(128).toString('utf8');

    // save in db
    const saveToDb = await userControllers.saveTokenToDb(email, randomToken);
  }

  return res.status(200).send('Request under process');
};

export const userMiddelwares = {
  createUser,
  updateUserFunc,
  getUserFavorite,
  resetPassword,
};
