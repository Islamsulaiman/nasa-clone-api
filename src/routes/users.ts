import { Router } from 'express';
import { userMiddelwares } from '../middelwares/users';
import { errorHandling } from '../middelwares/errorFunction';
import { validations } from '../middelwares/validations';

const router = Router();

router.patch(
  '/profile/:id',
  validations.checkEmail,
  validations.checkPassowrd,
  errorHandling(userMiddelwares.updateUserFunc),
);

export const userRoute: Router = router;
