import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === 'password') {
    res.json({ token: jwt.sign({ username }, 'secret') })
  }
  res.status(401)
});

export default router;
