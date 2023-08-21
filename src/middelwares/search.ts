/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import axios from 'axios';

const serachData = async (req: Request, res: Response) : Promise<Response> => {
  let { pageNumber = 0, limit = 0 } = req.query;
  const { q } = req.query;

  pageNumber = parseInt(pageNumber as string, 10);
  limit = parseInt(limit as string, 10);

  const response = await axios.get(`https://images-api.nasa.gov/search?q=${q}&page=${pageNumber}&page_size=${limit}`);

  const myData = await response.data;

  if (myData.collection.items.length === 0) throw new Error('11');

  return res.status(200).send(myData);
};

export const searchMethods = {
  serachData,
};
