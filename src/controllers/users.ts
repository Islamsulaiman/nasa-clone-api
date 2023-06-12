import { models } from '../models';

const creat = (data:any) => models.User.create(data);

export const userControllers = {
  creat,
};
