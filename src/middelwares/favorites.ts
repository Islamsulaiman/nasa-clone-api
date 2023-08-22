/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Request, Response } from 'express';

import { favoriteControllers } from '../controllers/favorites';
import { userControllers } from '../controllers/users';

import redisClient from '..';

const add = async (req: Request, res: Response) : Promise<Response> => {
  const {
    href, data, links,
  } = req.body;
  const { userId } = req.query;
  const { nasa_id } = data[0];

  // async function addData() {
  //   try {

  //     // const newObj = {
  //     //   href, data, links, increment,
  //     // }

  //     console.log("check")
  //     console.log(await redisClient.get("not in"))
  //     if (await redisClient.exists(JSON.stringify(nasa_id))) console.log("it exists")
  //     await redisClient.set(JSON.stringify(nasa_id), JSON.stringify(data));
  //     const redisData = await redisClient.get(JSON.stringify(nasa_id));

  //     console.log(typeof redisData)

  //     console.log("inside add")

  //     console.log(`data is ${redisData}`);
  //   } catch (error) {
  //     console.log('redis error');
  //     console.log(error)
  //   }
  // }

  // addData();

  // console.log('inside favorite');

  // 1 Check first if the favorite already there in the favorite document using nasa_id
  const isFavoriteExists = await favoriteControllers.findByNasaId(nasa_id); // will return empty array if not already in
  // 1.a if its not in the fav doc, add it and return the object id of the favorite

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
  const { userId, favoriteId } = req.query;

  // 1 remove from user favorite array
  const removeFromUser = await userControllers.removeFavorite(userId as string, favoriteId as never); // returns false if it's not inside the user from the beggining, otherwise return true
  if (!removeFromUser) throw new Error('22');

  const nasa_id = await favoriteControllers.getNasaIdById(favoriteId as string);

  // 2.b decrement and delete from favorite if last user
  await favoriteControllers.decrement(nasa_id as string); // this either returns null if we just decremented, or return nasa_id if we deleted the document also

  return res.sendStatus(200);
};

export const favoriteMiddelware = {
  add,
  remove,
};
