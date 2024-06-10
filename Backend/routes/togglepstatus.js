import express from 'express';
const router2 = express.Router();
import { togglestatus } from '../controllers/togglestatus.js';

router2.post('/toggleprobstatus',togglestatus);

export default router2;