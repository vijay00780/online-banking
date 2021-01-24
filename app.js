const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const userRoute = require('./routes/user');
const formsRoute = require('./routes/forms');
const path = require('path');

const app = express();
// default options
app.use(fileUpload());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public/img')));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(formsRoute);
app.use(userRoute);

app.listen(3000);