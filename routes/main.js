const express = require('express');
const router = express.Router();
const { saveOrder } = require('../models/orderModel');
const db = require('../models/db');  

// Homepage
router.get('/', (req, res) => {
  res.render('home');
});

// Contact Page (GET and POST)
router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/contact', (req, res) => {
  const { firstname, address, email, phone, product, quantity, message } = req.body;

  const order = {
    name: firstname,
    address,
    email,
    phone,
    product,
    quantity,
    message
  };

  saveOrder(order);
res.render('thanku', { name: order.name });
});

// Other pages
router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/collection', (req, res) => {
  res.render('collection');
});

router.get('/birthday', (req, res) => {
  res.render('birthday');
});

router.get('/roses', (req, res) => {
  res.render('roses');
});

router.get('/faq', (req, res) => {
  res.render('faq');
});

router.get('/custom', (req, res) => {
  res.render('custom');
});
router.post('/custom', (req, res) => {
  console.log('Custom order received:', req.body);
  const { flowerType, colorPreference, wrapStyle, noteMessage, deliveryDate } = req.body;
  res.render('custom-success', { flowerType, deliveryDate });
});

router.get('/orders', (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/admin/login');
  }

  db.all('SELECT * FROM orders', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.send("Error fetching data");
    } else {
      res.render('orders', { orders: rows });
    }
  });
});

// Show login form
router.get('/admin/login', (req, res) => {
  res.render('admin-login'); // create this EJS view
});

// Handle login
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Very basic check (replace with DB/user auth if needed)
  if (username === 'admin' && password === 'admin123') {
    req.session.isAdmin = true;
    res.redirect('/orders');
  } else {
    res.send('Invalid credentials');
  }
});

// Admin logout

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Logout error:', err);
      res.send('Error logging out');
    } else {
      console.log("Admin logged out successfully");
      res.redirect('/home');
    }
  });
});





module.exports = router;

