/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import axios from 'axios';

const serachData = async (req: Request, res: Response) : Promise<Response> => {
  let { pageNumber = 0, limit = 0 } = req.query;
  const { q } = req.query;

  pageNumber = parseInt(pageNumber as string, 10);
  limit = parseInt(limit as string, 10);

  const response = await axios.get(`https://images-api.nasa.gov/search?q=${q}`);
  const myData = await response.data;

  // eslint-disable-next-line space-unary-ops
  const myDataAraray = myData.collection.items.slice(pageNumber * limit, (pageNumber * limit) + limit);

  return res.status(200).send(myDataAraray);
};

export const searchMethods = {
  serachData,
};
