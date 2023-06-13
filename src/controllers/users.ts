/* eslint-disable max-len */
import { models } from '../models';

type UpdteUserData = {
  fullName?: string,
  password?: string,
  email?: string,
  userName?: string,
  image?: string
};

const creat = (data:any) => models.User.create(data);

const getUser = (email:string) => {
  const user = models.User.findOne({ email });
  return user;
};

const updateUser = (id: string, data: UpdteUserData) => models.User.updateOne({ _id: id }, data, { runValidators: true });

const addFavorite = (id:string, favoriteId: string) => models.User.updateOne({ _id: id }, { $addToSet: { favorites: favoriteId } });

export const userControllers = {
  creat,
  getUser,
  updateUser,
  addFavorite,
};
