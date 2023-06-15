import { Router } from 'express';
import { userMiddelwares } from '../middelwares/users';
import { loginMethods } from '../middelwares/login';
import { errorHandling } from '../middelwares/errorFunction';
import { userRoute } from './users';
import { authMethods } from '../middelwares/authuntication';
import { searchRoute } from './search';
import { favoriteRoute } from './favorites';

const router = Router();

router.post('/register', errorHandling(userMiddelwares.createUser));

router.use('/login', errorHandling(loginMethods.userLogin));

router.use('/users', errorHandling(userRoute));

router.use('/search', searchRoute);

router.use('/favorite', authMethods.userAuth, errorHandling(favoriteRoute));

export const indexRouter:Router = router;
