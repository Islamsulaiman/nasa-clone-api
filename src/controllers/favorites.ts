import { models } from '../models';
import { IFavorite } from '../models/favorites';

const add = (data: IFavorite) => models.Favorites.create(data);

const findByNasaId = (nasa_id:number) => models.Favorites.find({ 'data.nasa_id': nasa_id });

export const favoriteModels = {
  add,
  findByNasaId,
};
