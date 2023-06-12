import { Router } from 'express';
import { userMiddelwares } from '../middelwares/users';
import { loginMethods } from '../middelwares/login';
import { errorHandling } from '../middelwares/errorFunction';
import { userRoute } from './users';

const router = Router();

router.post('/register', errorHandling(userMiddelwares.createUser));

router.use('/login', errorHandling(loginMethods.userLogin));

router.use('/users', errorHandling(userRoute));

export const indexRouter:Router = router;
