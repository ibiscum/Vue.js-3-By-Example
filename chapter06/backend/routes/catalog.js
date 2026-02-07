import { Router } from 'express';
const router = Router();
import Database from 'better-sqlite3';
import verifyToken from '../middlewares/verify-token.js';

import rateLimit from 'express-rate-limit';

// Rate limiter: 100 requests per 15 minutes per IP for write operations
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests. Please try again later." }
});

const db = new Database('backend.db', { verbose: console.log });
db.pragma('journal_mode = WAL');


router.get('/', (req, res,) => {

  db.serialize(() => {
    db.all("SELECT * FROM catalog_items", [], (err, rows = []) => {
      res.json(rows)
    });
  })
  db.close();
});

router.post('/', writeLimiter, verifyToken, (req, res,) => {
  const { name, description, imageUrl } = req.body
  db.serialize(() => {
    const stmt = db.prepare(`
    INSERT INTO catalog_items (
      name,
      description,
      image_url
    ) VALUES (?, ?, ?)
  `
    );
    stmt.run(name, description, imageUrl)
    stmt.finalize();
    res.json({ status: 'success' })
  })
  db.close();
});

router.delete('/:id', writeLimiter, verifyToken, (req, res,) => {
  const { id } = req.params
  db.serialize(() => {
    const stmt = db.prepare("DELETE FROM catalog_items WHERE id = (?)");
    stmt.run(id)
    stmt.finalize();
    res.json({ status: 'success' })
  })
  db.close();
});

export default router;
