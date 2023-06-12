import { Router } from 'express';
import { userMiddelwares } from '../middelwares/users';

const router = Router();

router.post('/register', userMiddelwares.createUser);

export const indexRouter:Router = router;
