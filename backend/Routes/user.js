import {Router} from 'express';
import {Signup  } from './../controolers/user.js';

const router = Router();
  


router.post('/signup' , Signup);

export default router;