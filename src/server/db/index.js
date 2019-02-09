const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(`${__dirname}/db.db`);

////////////////////////////////////////////////////////////////////////////////
/// Create table
////////////////////////////////////////////////////////////////////////////////

const createTableItems = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      price INTEGER NOT NULL DEFAULT 0,
      quantity INTEGER NOT NULL DEFAULT 0,
      purchased INTEGER NOT NULL DEFAULT 0
    )`;
  return new Promise((resolve, reject) => {
    db.exec(sql, err => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

////////////////////////////////////////////////////////////////////////////////
/// Resolve queries
////////////////////////////////////////////////////////////////////////////////

const getItem = id => {
  const sql = 'SELECT * FROM items WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.get(sql, [id], (err, row) => {
      if (err) return reject(err);
      return resolve(row);
    });
  });
};

const getItems = () => {
  const sql = 'SELECT * FROM items';
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });
};

////////////////////////////////////////////////////////////////////////////////
/// Resolve mutations
////////////////////////////////////////////////////////////////////////////////

const createItem = ({ name, price, quantity, purchased }) => {
  const purchasedInt = purchased ? 1 : 0;
  const sql = `INSERT INTO items (name, price, quantity, purchased)
               VALUES ($1, $2, $3, $4)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [name, price, quantity, purchasedInt], function(err) {
      if (err) return reject(err);
      return resolve({
        id: this.lastID,
        name,
        price,
        quantity,
        purchased
      });
    });
  });
};

const updateItem = (id, { name, price, quantity, purchased }) => {
  const purchasedInt = purchased ? 1 : 0;
  const sql = `UPDATE items
               SET (name, price, quantity, purchased) = ($1, $2, $3, $4)
               WHERE id = $5`;
  return new Promise((resolve, reject) => {
    db.run(sql, [name, price, quantity, purchasedInt, id], function(err) {
      if (err) return reject(err);
      return resolve({
        id,
        name,
        price,
        quantity,
        purchased
      });
    });
  });
};

const deleteItem = id => {
  const sql = 'DELETE FROM items WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.run(sql, id, err => {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

////////////////////////////////////////////////////////////////////////////////
/// Export
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  createTableItems,
  getItem,
  getItems,
  createItem,
  updateItem,
  deleteItem
};
