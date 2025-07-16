const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your-secret-key', // use a strong secret in production
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
