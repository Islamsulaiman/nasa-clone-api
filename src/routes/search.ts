import { Router } from 'express';
import { searchMethods } from '../middelwares/search';

const router = Router();

router.get('/', searchMethods.serachData);

export const searchRoute: Router = router;
