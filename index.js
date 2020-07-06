const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();

app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.listen(port, () => console.log(`server started on port: ${port}`));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  render('home', req, res);
});

app.get('/about', (req, res) => {
  render('about', req, res);
});

app.get('/profile', (req, res) => {
  render('profile', req, res);
});

app.get('/settings', (req, res) => {
  render('settings', req, res);
});

app.get('/friends', (req, res) => {
  render('friends', req, res);
});

app.post('/login', (req, res) => {
  res.set('Content-Type', 'text/html');
  console.log(req.body);
  if (validateUser(req.body)) {
    res.render('home');
  } else {
    res.render('signin');
  }
})

function render(page, req, res) {
  try {
    if (validateUser(JSON.parse(req.cookies.user))) {
      res.render(page);
    } else {
      res.render('signin');
    }
  } catch (error) {
    res.render('signin');
  }
}

function validateUser(user) {
  // Query User Database

  // Validate User
  if (user != undefined) {
    return true;
  } else {
    return false;
  }
}
