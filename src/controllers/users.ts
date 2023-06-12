import { models } from '../models';

const creat = (data:any) => models.User.create(data);

const getUser = (email:string) => {
  const user = models.User.findOne({ email });
  return user;
};

export const userControllers = {
  creat,
  getUser,
};
