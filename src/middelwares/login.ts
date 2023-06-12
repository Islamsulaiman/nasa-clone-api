import { Request, Response } from 'express';
import { authMethods } from './authuntication';
import { userControllers } from '../controllers/users';

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userDataFromDB: any = await userControllers.getUser(email);

  // Email or password dosnt match!, try again
  if (!userDataFromDB) throw new Error('2');

  // compare user input data with db data
  const compare = await authMethods.comparePasswd(password, userDataFromDB.password);
  if (!compare) res.status(401).json('error2');
  else {
    // send user a token
    const token = authMethods.generateJWT({ id: userDataFromDB.id });
    res.status(200).json({ token });
  }
};

export const loginMethods = {
  userLogin,
};
