import { Router } from 'express';
import { userMiddelwares } from '../middelwares/users';
import { loginMethods } from '../middelwares/login';

const router = Router();

router.post('/register', userMiddelwares.createUser);

router.use('/login', loginMethods.userLogin);

export const indexRouter:Router = router;
