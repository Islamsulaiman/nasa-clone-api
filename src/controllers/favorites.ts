/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { models } from '../models';
import { IFavorite } from '../models/favorites';

const add = async (data: IFavorite) => {
  const newFavorite = await models.Favorites.create(data);
  return newFavorite._id; // assuming the object id field is named "_id"
};

const findByNasaId = (nasa_id:string) => models.Favorites.find({ 'data.nasa_id': nasa_id });

const getNasaIdById = async (id: string) => {
  try {
    const favorite = await models.Favorites.findById(id);
    if (!favorite) {
      throw new Error('Favorite not found');
    }
    return favorite.data[0].nasa_id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const increment = (nasa_id:string) => models.Favorites.updateOne({ 'data.nasa_id': nasa_id }, { $inc: { increment: 1 } });

const decrement = async (nasa_id:string) => {
  const result = await models.Favorites.findOneAndUpdate(
    { 'data.nasa_id': nasa_id },
    { $inc: { increment: -1 } },
    { new: true },
  );

  if (result && result?.increment <= 0) {
    const deletedDocument = await models.Favorites.findByIdAndDelete(result._id);
    return deletedDocument?._id;
  }
  return result?._id;
};

const remove = (favoriteId:any) => models.Favorites.deleteOne({ _id: favoriteId });

export const favoriteControllers = {
  add,
  findByNasaId,
  increment,
  decrement,
  remove,
  getNasaIdById,
};
