import { Router } from 'express';
import { userMiddelwares } from '../middelwares/users';
import { errorHandling } from '../middelwares/errorFunction';

const router = Router();

router.patch(
  '/profile/:id',
  //   validation.checkFirstName,
  //   validation.checkLastName,
  //   validation.checkEmail,
  //   validation.validateInput,
  errorHandling(userMiddelwares.updateUserFunc),
);

export const userRoute: Router = router;
