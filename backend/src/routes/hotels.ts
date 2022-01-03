import { Router } from 'express';
import { getHotels } from '../controllers/hotels';

const router = Router();

router.get('/hotels', getHotels);

export default router;