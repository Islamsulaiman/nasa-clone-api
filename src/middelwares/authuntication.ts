import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { models } from '../models';

dotenv.config();
const JWTSecret = process.env.JWT_SECRET;
const { promisify } = require('util');

const verify = promisify(jwt.verify);

// const verifyUser = (token: string, secret: string) => jwt.verify(token, JWTSecret);

const hashPassword = (password: String): String => bcrypt.hashSync(password as string, 10);

const comparePasswd = async (enteredPassword: string, DB_password: any) :
Promise<boolean> => {
  // check if password match Db password
  const result = await bcrypt.compare(enteredPassword, DB_password); // return's bool
  return result;
};

type IokenPayload = {
  id: string
};

const generateJWT = (payload: IokenPayload):String => jwt.sign(payload, JWTSecret as string, { expiresIn: '7d' });

// Check if user
const userAuth = async (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader == null) return res.sendStatus(401);

  const payload = await verify(authHeader, JWTSecret as string);
  const user = await models.User.findById(payload.id);

  if (!user) throw new Error('5');

  return next();
};

export const authMethods = {
  hashPassword,
  comparePasswd,
  generateJWT,
  userAuth,
  // verifyUser,
};
