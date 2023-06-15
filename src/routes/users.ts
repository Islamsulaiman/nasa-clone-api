import { Router } from 'express';
import { userMiddelwares } from '../middelwares/users';
import { errorHandling } from '../middelwares/errorFunction';
import { validations } from '../middelwares/validations';
import { authMethods } from '../middelwares/authuntication';

const router = Router();

router.patch(
  '/profile/:id',
  validations.checkEmail,
  validations.checkPassowrd,
  authMethods.userAuth,
  errorHandling(userMiddelwares.updateUserFunc),
);

router.get('/getFavorites', authMethods.userAuth, errorHandling(userMiddelwares.getUserFavorite));

router.post('/reset', userMiddelwares.resetPassword);

export const userRoute: Router = router;
