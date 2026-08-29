import {Router} from 'express';
import {protectRoute} from '../utillas/protectRoute.js';
import createCar, { getCarById, updateCar  , getAllCars , getCarByIdPublic} from '../controolers/car.js';

const router = Router();
router.get("/all", getAllCars);
router.get("/public/:id", getCarByIdPublic);
router.post("/create", protectRoute, createCar);

router.get("/:id", protectRoute, getCarById);
router.put("/update/:id", protectRoute, updateCar);


export default router;