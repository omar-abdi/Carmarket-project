import {Router} from 'express';
import {protectRoute} from '../utillas/protectRoute.js';
import createCar from '../controolers/car.js';
import{updateCar} from '../controolers/car.js';
const router = Router();

router.post("/create" , protectRoute , createCar) 
router.put("/update/:id" , protectRoute , updateCar)
 
export default router;