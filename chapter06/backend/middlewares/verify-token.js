import * as jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.get('x-token')
  try {
    jwt.verify(token, 'secret');
    next()
  } catch (err) {
    console.error(err);
    res.status(401).send('Unauthorized')
  }
}
