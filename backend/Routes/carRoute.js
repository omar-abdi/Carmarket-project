import {Router} from 'express';
import {protectRoute} from '../utillas/protectRoute.js';
import createCar, { getCarById, updateCar  , getAllCars} from '../controolers/car.js';

const router = Router();

router.post("/create", protectRoute, createCar);
router.get("/:id", protectRoute, getCarById);
router.put("/update/:id", protectRoute, updateCar);
router.get("/all", getAllCars);

export default router;