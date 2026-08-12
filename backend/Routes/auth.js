import {Router} from 'express';
import {protectRoute} from '../utillas/protectRoute.js';

const router = Router();
 router.put("/update/id" , protectRoute) 