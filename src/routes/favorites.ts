import { Router } from 'express';
import { favoriteMiddelware } from '../middelwares/favorites';
import { errorHandling } from '../middelwares/errorFunction';

const router = Router();

router.post('/add', errorHandling(favoriteMiddelware.add));

router.delete('/remove', errorHandling(favoriteMiddelware.remove));

export const favoriteRoute: Router = router;
