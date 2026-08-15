import {Router} from 'express';
import {protectRoute} from '../utillas/protectRoute.js';
import updateUser from '../controolers/auth.js';
import {deleteUser , getListing} from '../controolers/auth.js';

const router = Router();
 router.put("/update/:id" , protectRoute , updateUser)
 router.delete("/delete/:id" , protectRoute , deleteUser)
 router.get("/listing/:id" , protectRoute , getListing)
 



 export default router;