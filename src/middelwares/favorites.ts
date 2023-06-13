/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Request, Response } from 'express';

import { favoriteControllers } from '../controllers/favorites';
import { userControllers } from '../controllers/users';
import { models } from '../models';

const add = async (req: Request, res: Response) : Promise<Response> => {
  const {
    href, data, links, _id,
  } = req.body;
  const increment = 1;

  const { nasa_id } = data[0];

  const userId = '648859c255935ea38dc0a9ee';
  const favoriteId = _id.$oid;

  // 1 Check first if the favorite alread there in the favorite document using nasa_id
  const isFavoriteExists = await favoriteControllers.findByNasaId(nasa_id);

  // 1.a if already inside favorite document, isFavoriteExists will not be an empty array
  if (isFavoriteExists.length > 0) {
    //  add to user array of favorites
    const userFavorites = await userControllers.addFavorite(userId, favoriteId); // returns false if this specific user already had it, so throw error
    if (!userFavorites) throw new Error('21');

    // increment counter inside this specific favorite
    await favoriteControllers.increment(nasa_id);
    return res.sendStatus(200);
  }

  // 2 add to favorite table if not already there
  await favoriteControllers.add({
    href, data, links, increment,
  });

  // 3 add to user array of favorites
  await userControllers.addFavorite(userId, favoriteId);

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
