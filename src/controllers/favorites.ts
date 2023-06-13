/* eslint-disable max-len */
import { models } from '../models';
import { IFavorite } from '../models/favorites';

const add = (data: IFavorite) => models.Favorites.create(data);

const findByNasaId = (nasa_id:string) => models.Favorites.find({ 'data.nasa_id': nasa_id });

const increment = (nasa_id:string) => models.Favorites.updateOne({ 'data.nasa_id': nasa_id }, { $inc: { increment: 1 } });

export const favoriteControllers = {
  add,
  findByNasaId,
  increment,
};
