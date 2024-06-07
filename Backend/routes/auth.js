import express from 'express';
const router = express.Router();
import {register, login} from '../controllers/auth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/abc', async (req, res) => {
  res.send('jkvbd');
  console.log('C');
})
export default router;