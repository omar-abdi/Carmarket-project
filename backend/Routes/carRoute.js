import {Router} from 'express';
import {protectRoute} from '../utillas/protectRoute.js';
import createCar from '../controolers/car.js';

const router = Router();

router.post("/create" , protectRoute , createCar)   
 
export default router;