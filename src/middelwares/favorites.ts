/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Request, Response } from 'express';

import { favoriteControllers } from '../controllers/favorites';
import { userControllers } from '../controllers/users';
import { models } from '../models';

const add = async (req: Request, res: Response) : Promise<Response> => {
  const {
    href, data, links,
  } = req.body;

  const { userId } = req.query;
  const { nasa_id } = data[0];

  // 1 Check first if the favorite alread there in the favorite document using nasa_id
  const isFavoriteExists = await favoriteControllers.findByNasaId(nasa_id); // will return empty array if not already in
  // 1.a if its not in the fav doc, add it and return the object id of the favorite

  console.log('isFavoriteExists');
  console.log(isFavoriteExists);

  let favoriteId;

  if (isFavoriteExists.length === 0) {
    // add to favorite table
    const increment = 0;
    const objetIdAfterAdding = await favoriteControllers.add({
      href, data, links, increment,
    });
    favoriteId = objetIdAfterAdding;
  } else {
    // it already have the doc so we have the object ID
    favoriteId = isFavoriteExists[0]._id;
  }

  const userFavorites = await userControllers.addFavorite(userId as string, favoriteId); // returns false if this specific user already had it, so throw error
  if (!userFavorites) {
    if (isFavoriteExists[0].increment === 0) {
      await favoriteControllers.remove(favoriteId);
      console.log('deleted');
    }
    throw new Error('21');
  }

  await favoriteControllers.increment(nasa_id);
  return res.sendStatus(200);
};

const remove = async (req: Request, res: Response) : Promise<Response> => {
  const { userId } = req.query;
  const { data } = req.body;

  const { nasa_id } = data[0];

  console.log('hello');
  console.log(userId, nasa_id);

  // get the document object ID
  const document = await favoriteControllers.findByNasaId(nasa_id);
  const documentObjectId = document[0]._id;

  // 1 remove from user favorite array
  const removeFromUser = await userControllers.removeFavorite(userId as string, documentObjectId); // returns false if it's not inside the user from the beggining, otherwise return true
  if (!removeFromUser) throw new Error('22');

  // 2 Remove from favorite document, check before deleting if increment <= 0
  // 2.a check

  // 2.b decrement and delete from favorite if last user
  const decrement = await favoriteControllers.decrement(nasa_id); // this either returns null if we just decremented, or return nasa_id if we deleted the document also

  return res.sendStatus(200);
};

export const favoriteMiddelware = {
  add,
  remove,
};
