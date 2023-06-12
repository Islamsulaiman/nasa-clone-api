/* eslint-disable import/no-extraneous-dependencies */
import express, { Express, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';

dotenv.config();

const mongoUrl = process.env.MONGO_URL as string;
mongoose.connect(mongoUrl)
  .then(() => console.log('DB connected'))
  .catch(() => console.log('DB connection failed'));

const app : Express = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use('/', (req: Request, res: Response) => {
  console.log('Index');
  return res.status(200).send('Hello from space');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The server is running on port " ${port}"`);
});
