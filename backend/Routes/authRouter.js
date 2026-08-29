import {Router} from 'express';
import {protectRoute} from '../utillas/protectRoute.js';
import updateUser from '../controolers/auth.js';
import {deleteUser , getListing ,deleteListing} from '../controolers/auth.js';
import {getUsr} from '../controolers/userControoller.js';

const router = Router();
 router.put("/update/:id" , protectRoute , updateUser)
 router.delete("/delete/:id" , protectRoute , deleteUser)
 router.get("/listing/:id" , protectRoute , getListing)
 router.get('/:id' ,  protectRoute , getUsr)
 
 router.delete("/listing/:id" , protectRoute , deleteListing)



 export default router;