import {Router} from 'express';
import {Signup , Login} from '../controolers/user.js';

const router = Router();
  


router.post('/signup' , Signup);
router.post('/login' , Login);

export default router;