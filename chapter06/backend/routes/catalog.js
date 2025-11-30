const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const verifyToken = require('../middlewares/verify-token')

const rateLimit = require('express-rate-limit');

// Rate limiter: 100 requests per 15 minutes per IP for write operations
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests. Please try again later." }
});
router.get('/', (req, res,) => {
  const db = new sqlite3.Database('./db.sqlite');
  db.serialize(() => {
    db.all("SELECT * FROM catalog_items", [], (err, rows = []) => {
      res.json(rows)
    });
  })
  db.close();
});

router.post('/', writeLimiter, verifyToken, (req, res,) => {
  const { name, description, imageUrl } = req.body
  const db = new sqlite3.Database('./db.sqlite');
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
  const db = new sqlite3.Database('./db.sqlite');
  db.serialize(() => {
    const stmt = db.prepare("DELETE FROM catalog_items WHERE id = (?)");
    stmt.run(id)
    stmt.finalize();
    res.json({ status: 'success' })
  })
  db.close();
});

module.exports = router;
