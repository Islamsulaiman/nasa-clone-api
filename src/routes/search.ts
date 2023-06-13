import { Router } from 'express';
import { searchMethods } from '../middelwares/search';
import { errorHandling } from '../middelwares/errorFunction';

const router = Router();

router.get('/', errorHandling(searchMethods.serachData));

export const searchRoute: Router = router;
