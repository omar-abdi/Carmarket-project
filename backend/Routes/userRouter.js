import {Router} from 'express';
import {Signup , Login} from '../controolers/userControoller.js';
import {sendContactEmail} from '../controolers/contact.js';
const router = Router();
  


router.post('/signup' , Signup);
router.post('/login' , Login);
router.post('/email' , sendContactEmail);


export default router;