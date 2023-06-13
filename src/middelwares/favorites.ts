import { Request, Response } from 'express';

import { favoriteControllers } from '../controllers/favorites';
import { userControllers } from '../controllers/users';

const add = async (req: Request, res: Response) : Promise<Response> => {
  const { href, data, links } = req.body;
  const increment = 1;

  //   console.log(href, data, links, increment);

  // 1 add to favorite table if not already there
  const myFavorites = await favoriteControllers.add({
    href, data, links, increment,
  });

  //   console.log(`myFavorites ${myFavorites}`);

  const userId = '648859c255935ea38dc0a9ee';
  const favoriteId = '648859fb55935ea38dc0a9f0';

  console.log(`userId: ${userId} favoriteId ${favoriteId}`);

  // 2 add to user array of favorites
  const userFavorites = await userControllers.addFavorite(userId, favoriteId);

  console.log(`userFavorites ${userFavorites}`);

  return res.status(200).send(myFavorites);
};

export const favoriteMiddelware = {
  add,
};
