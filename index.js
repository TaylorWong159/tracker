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
  // Check User Cookies for info
  try {
    validateUser(JSON.parse(req.cookies.user), res);
  } catch (error) {
    res.render('signin');
  }
});

app.post('/login', (req, res) => {
  res.set('Content-Type', 'text/html');
  validateUser(JSON.parse(req.body), res);
})


function validateUser(user, res) {
  // Query User Database

  // Validate User
  if (user != undefined) {
    res.render('home');
  } else {
    res.render('signin');
  }
}
