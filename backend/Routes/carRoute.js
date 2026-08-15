import {Router} from 'express';
import {protectRoute} from '../utillas/protectRoute.js';
import createCar, { getCarById, updateCar } from '../controolers/car.js';

const router = Router();

router.post("/create", protectRoute, createCar);
router.get("/:id", protectRoute, getCarById);
router.put("/update/:id", protectRoute, updateCar);

export default router;