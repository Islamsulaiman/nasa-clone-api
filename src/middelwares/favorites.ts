/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Request, Response } from 'express';

import { favoriteControllers } from '../controllers/favorites';
import { userControllers } from '../controllers/users';

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

export const favoriteMiddelware = {
  add,
};
