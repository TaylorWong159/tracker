const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { User, Friend } = require('./user.js');
const encryption = require('./encrypt.js');

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
  let user;
  try {
    user = validateUser(JSON.parse(encryption.decrypt(req.cookies.user)));
  } catch (err) {
    user = undefined;
  }

  if (user) {
    res.send({ userFound: true, user: encryption.encrypt(JSON.stringify({ name: user.name, password: user.password })), msg: 'cookie' });
  } else {
    let newUser;
    try {
      newUser = validateUser(req.body);
      if (newUser) {
        res.send({ userFound: true, user: encryption.encrypt(JSON.stringify(req.body)), msg: '' });
      } else {
        res.send({ userFound: false, msg: 'User Not Found' });
      }
    } catch(err) {
      res.send({ userFound: false, msg: 'User Not Found' });
    }

  }
})

function render(page, req, res) {
  try {
    let user = validateUser(JSON.parse(encryption.decrypt(req.cookies.user)));
    if (user) {
      res.render(page);
    } else {
      res.render('signin');
    }
  } catch (error) {
    res.render('signin');
  }
}

function validateUser(info) {
  // Query User Database
  let user;
  try {
    if (info.name && info.password) {
      user = new User(info.name, info.password);
    }
  } catch (err) {
    user = undefined;
  }

  // Validate User
  return user;
}
