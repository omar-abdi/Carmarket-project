import { Router } from 'express';
import { sendContactEmail } from '../controolers/contact.js';

const router = Router();

router.post('/send', sendContactEmail);

export default router;
