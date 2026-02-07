import { Router } from 'express';
import Database from 'better-sqlite3';
const router = Router();
import verifyToken from '../middlewares/verify-token.js';

// Rate limiter for sensitive operations
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes.'
});

const db = new Database('backend.db', { verbose: console.log });
db.pragma('journal_mode = WAL');

router.get('/', (req, res) => {
  const db = new sqlite3.Database('./db.sqlite');
  db.serialize(() => {
    db.all(`
      SELECT
        bookings.*,
        catalog_items.name AS catalog_item_name,
        catalog_items.description AS catalog_item_description
      FROM bookings
      INNER JOIN catalog_items ON catalog_items.id = bookings.catalog_item_id
    `,
      [],
      (err, rows = []) => {
        res.json(rows)
      });
  })
  db.close();
});

router.post('/', (req, res) => {
  const db = new sqlite3.Database('./db.sqlite');
  const { catalogItemId, name, address, startDate, endDate } = req.body
  db.serialize(() => {
    const stmt = db.prepare(`
      INSERT INTO bookings (
        catalog_item_id,
        name,
        address,
        start_date,
        end_date
      ) VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(catalogItemId, name, address, startDate, endDate)
    stmt.finalize();
    res.json({ catalogItemId, name, address, startDate, endDate })
  })
  db.close();
});

router.delete('/:id', limiter, verifyToken, (req, res) => {
  const db = new sqlite3.Database('./db.sqlite');
  const { id } = req.params
  db.serialize(() => {
    const stmt = db.prepare("DELETE FROM bookings WHERE id = (?)");
    stmt.run(id)
    stmt.finalize();
    res.json({ status: 'success' })
  })
  db.close();
});

export default router;
