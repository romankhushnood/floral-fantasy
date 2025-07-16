const db = require('./db'); // ✅ This connects to flowershop.db via db.js

function saveContact(name, email, message) {
  const stmt = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
  db.run(stmt, [name, email, message], function (err) {
    if (err) {
      return console.error("❌ Error saving contact:", err.message);
    }
    console.log(`✅ Contact saved: ${name} (ID: ${this.lastID})`);
  });
}

module.exports = { saveContact };
