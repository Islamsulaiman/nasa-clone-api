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

const addFavorite = async (id:string, favoriteId: any) => {
  const result = await models.User.findOneAndUpdate(
    { _id: id, favorites: { $ne: favoriteId } }, // Only update if the `favorites` array doesn't already contain `favoriteId`
    { $addToSet: { favorites: favoriteId } }, // Add `favoriteId` to the `favorites` array
    { new: true }, // Return the updated document
  );

  if (result) {
    // If the `favorites` array was modified, return the updated document
    return result;
  }
  // If the `favorites` array was not modified, return false
  return false;
};

const removeFavorite = async (userId: string, favoriteId: never) => {
  // Find the user document with the matching `_id`
  const user = await models.User.findOne({ _id: userId });

  if (user && user.favorites.includes(favoriteId)) {
    // If the `favoriteId` is present in the `favorites` array, remove it using `findOneAndUpdate()`
    await models.User.findOneAndUpdate({ _id: userId }, { $pull: { favorites: favoriteId } });
    return true;
  }
  return false;
};

const getUserFavorites = async (userId:string) => {
  try {
    const user = await models.User.findById(userId).populate('favorites');
    return user?.favorites;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const resetPassword = (email: string) => models.User.findOne({ email });

const saveTokenToDb = (email : string, token: string) => models.User.findOneAndUpdate({ email }, { $push: { tags: token } });

export const userControllers = {
  creat,
  getUser,
  updateUser,
  addFavorite,
  removeFavorite,
  getUserFavorites,
  resetPassword,
  saveTokenToDb,
};
