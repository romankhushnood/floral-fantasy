const db = require('./db');

function saveOrder(order) {
  const { name, address, email, phone, product, quantity, message } = order;
  const sql = `
    INSERT INTO orders (name, address, email, phone, product, quantity, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [name, address, email, phone, product, quantity, message];
  db.run(sql, params, function(err) {
    if (err) {
      console.error("Error saving order:", err.message);
    } else {
      console.log("Order saved with ID:", this.lastID);
    }
  });
}

module.exports = {
  saveOrder
};
