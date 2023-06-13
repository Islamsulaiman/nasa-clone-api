/* eslint-disable max-len */
import { Request, Response } from 'express';

import { favoriteControllers } from '../controllers/favorites';
import { userControllers } from '../controllers/users';

const add = async (req: Request, res: Response) : Promise<Response> => {
  const { href, data, links } = req.body;
  const increment = 1;

  const { nasa_id } = data[0];

  const userId = '648859c255935ea38dc0a9ee';
  const favoriteId = '648859fb55935ea38dc0a9f0';

  // 1 Check first if the favorite alread there in the favorite document using nasa_id
  const isFavoriteExists = await favoriteControllers.findByNasaId(nasa_id);

  // 1.a if already inside favorite document, isFavoriteExists will not be an empty array
  if (isFavoriteExists.length > 0) {
    //  add to user array of favorites
    const userFavorites = await userControllers.addFavorite(userId, favoriteId); // returns false if this specific user already had it, so throw error
    if (!userFavorites) throw new Error('21');

    // increment counter inside this specific favorite
    const incrementFav = await favoriteControllers.increment(nasa_id);
  }

  // 2 add to favorite table if not already there
  const myFavorites = await favoriteControllers.add({
    href, data, links, increment,
  });

  //   console.log(`myFavorites ${myFavorites}`);

  console.log(`userId: ${userId} favoriteId ${favoriteId}`);

  // 3 add to user array of favorites
  const userFavorites = await userControllers.addFavorite(userId, favoriteId);

  console.log(`userFavorites ${userFavorites}`);

  return res.status(200).send(myFavorites);
};

export const favoriteMiddelware = {
  add,
};
