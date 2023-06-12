import {
  Request, Response, NextFunction,
} from 'express';

const errorFunction = (err:Error, req: Request, res: Response, next: NextFunction) => {
//   if (err.message === 'email') {
//     res.status(400).json({ 'Error Massage': 'Please enter a vailid email ' });
//   } else if (err.message.substring(0, 6) === 'E11000') {
//     // error from mongo (duplicated email)
//     res.status(400).json({ 'Error Massage': 'Duplicated email!' });
//   } else if (err.message === 'password') {
//     res.status(400).json({ 'Error Massage': 'Please enter a vailid password ' });
//   } else if (err.message === 'fullName') {
//     res.status(400).json({ 'Error Massage': 'Please enter a vailid Name ' });
//   } else if (err.message === 'User Not found! check your entred data') {
//     res.status(400).json({ 'Error massage': 'User Not found! check your entred data' });
//   } else if (err.message === 'Email or password dosnt match!, try again') {
//     res.status(400).json({ 'Error massage': 'Email or password dosnt match!, try again' });
//   }

  if (err.message.substring(0, 6) === 'E11000') {
    // error from mongo (duplicated email)
    res.status(400).json({ Error: 'Duplicated data!' });
  } else if (err.message === '1') {
    res.status(400).json({ 'Error massage': 'user not created due to network issue, please try again later' });
  } else if (err.message === '2') {
    res.status(400).json({ 'Error massage': 'Email or password dosnt match!, try again' });
  }

  //   console.log(err.message.substring(0, 6));

  next();
};

// high level Error wrapper function
const errorHandling = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export { errorFunction, errorHandling };
